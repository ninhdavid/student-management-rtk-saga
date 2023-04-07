import { makeStyles } from 'tss-react/mui';
import {
    Box,
    Grid,
    Select,
    MenuItem,
    Button,
    FormControl,
    InputLabel,
    OutlinedInput,
} from '@mui/material';
import { SelectChangeEvent } from '@mui/material/Select/Select';
import { Search } from '@mui/icons-material';

import { City, ListParams } from 'models';
import React, { ChangeEvent, useRef } from 'react';

export interface StudentFiltersProps {
    filter: ListParams;
    cityList: City[];

    onChange?: (newFilter: ListParams) => void;
    onSearchChange?: (newFilter: ListParams) => void;
}

export default function StudentFilters({
    filter,
    cityList,
    onChange,
    onSearchChange,
}: StudentFiltersProps) {
    const searchRef = useRef<HTMLInputElement>();

    const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (!onSearchChange) return;

        const newFilter: ListParams = {
            ...filter,
            name_like: e.target.value,
            _page: 1,
        };
        onSearchChange(newFilter);
    };

    // const handleCityChange = (e: React.ChangeEvent<{ name?: string; value: unknown }>) => {
    const handleCityChange = (e: SelectChangeEvent) => {
        if (!onChange) return;

        const newFilter: ListParams = {
            ...filter,
            _page: 1,
            city: (e.target.value || undefined) as string,
        };
        onChange(newFilter);
    };

    // const handleSortChange = (e: React.ChangeEvent<{ name?: string; value: unknown }>) => {
    const handleSortChange = (e: SelectChangeEvent) => {
        if (!onChange) return;

        const value = e.target.value;
        const [_sort, _order] = (value as string).split('.');
        const newFilter: ListParams = {
            ...filter,
            _sort: _sort || undefined,
            _order: (_order as 'asc' | 'desc') || undefined,
        };
        onChange(newFilter);
    };

    const handleClearFilter = () => {
        if (!onChange) return;

        const newFilter: ListParams = {
            ...filter,
            _page: 1,
            _sort: undefined,
            _order: undefined,
            city: undefined,
            name_like: undefined,
        };
        onChange(newFilter);

        if (searchRef.current) {
            searchRef.current.value = '';
        }
    };

    return (
        <Box>
            <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                    <FormControl fullWidth variant="outlined" size="small">
                        <InputLabel htmlFor="searchByName">Search by name</InputLabel>
                        <OutlinedInput
                            id="searchByName"
                            label="Search by name"
                            endAdornment={<Search />}
                            defaultValue={filter.name_like}
                            onChange={handleSearchChange}
                            inputRef={searchRef}
                        />
                    </FormControl>
                </Grid>

                <Grid item xs={12} md={6} lg={3}>
                    <FormControl variant="outlined" size="small" fullWidth>
                        <InputLabel id="filterByCity">Filter by city</InputLabel>
                        <Select
                            labelId="filterByCity"
                            value={filter.city || ''}
                            label="Filter by city"
                            onChange={handleCityChange}
                        >
                            <MenuItem value="">
                                <em>All</em>
                            </MenuItem>

                            {cityList.map((city) => (
                                <MenuItem key={city.code} value={city.code}>
                                    {city.name}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Grid>

                <Grid item xs={12} md={6} lg={2}>
                    <FormControl variant="outlined" size="small" fullWidth>
                        <InputLabel id="sortBy">Sort</InputLabel>
                        <Select
                            labelId="sortBy"
                            value={filter._sort ? `${filter._sort}.${filter._order}` : ''}
                            label="Sort"
                            onChange={handleSortChange}
                        >
                            <MenuItem value="">
                                <em>No sort</em>
                            </MenuItem>

                            <MenuItem value="name.asc">Name ASC</MenuItem>
                            <MenuItem value="name.desc">Name DESC</MenuItem>
                            <MenuItem value="mark.asc">Mark ASC</MenuItem>
                            <MenuItem value="mark.desc">Mark DESC</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>

                <Grid item xs={12} md={6} lg={1}>
                    <Button
                        variant="outlined"
                        color="primary"
                        fullWidth
                        onClick={handleClearFilter}
                    >
                        Clear
                    </Button>
                </Grid>
            </Grid>
        </Box>
    );
}
