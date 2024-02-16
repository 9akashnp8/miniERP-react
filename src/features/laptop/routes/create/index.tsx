import * as React from 'react';
import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import FormHelperText from "@mui/material/FormHelperText";
import Snackbar from "@mui/material/Snackbar";
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import LinearProgress from '@mui/material/LinearProgress';
import { SnackbarCloseReason } from "@mui/material/Snackbar";

import * as Yup from 'yup';
import { useFormik } from "formik";

import { useState } from "react";

import { Alert } from '../../../common/components/Alert';
import Grid from '../../../common/components/Grid';
import { laptopFieldMapping } from '../../utils/constants';
import { getKeyByValue } from '../../../common/utils/functions';
import config from './config';
import {
    useCreateNewLaptopMutation,
    useGetLaptopScreenSizesQuery,
} from '../../laptopsApiSlice';
import {
    useGetHardwareTypesQuery,
    useGetHardwareOwnersQuery,
    useGetHardwareConditionsQuery,
} from '../../../api/hardware/hardwareApiSlice';
import { useGetBranchesQuery } from '../../../employee/branchApiSlice';
import { useGetBrandsQuery } from '../../laptopBrandApiSlice';
import { useGetBuildingsQuery } from '../../../common/buildingApiSlice';
import { getCurrentDate } from '../../../../lib/utils';

export default function () {
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const { data: hardwareTypes } = useGetHardwareTypesQuery();
    const { data: hardwareOwners } = useGetHardwareOwnersQuery();
    const { data: hardwareConditions } = useGetHardwareConditionsQuery();
    const { data: locations } = useGetBranchesQuery();
    const { data: buildings } = useGetBuildingsQuery();
    const { data: laptopBrands } = useGetBrandsQuery();
    const { data: screenSizes } = useGetLaptopScreenSizesQuery();
    const [ createNewLaptop ] = useCreateNewLaptopMutation();
    const formik = useFormik({
        initialValues: {
            serialNumber: '',
            hardwareType: '',
            brand: '',
            processor: '',
            ramCapacity: '',
            storageCapacity: '',
            screenSize: '',
            screenType: '',
            hardwareOwner: '',
            rentalVendor: '',
            hardwareCondition: '',
            location: '',
            building: '',
            purchaseDate: getCurrentDate(new Date()),
            soldDate: undefined,
            returnDate: undefined,
            remarks: ''

        },
        validationSchema: Yup.object({
            serialNumber: Yup.string().required('Required'),
            hardwareType: Yup.string().required('Required'),
            brand: Yup.string().required('Required'),
            processor: Yup.string().required('Required'),
            ramCapacity: Yup.string().required('Required'),
            storageCapacity: Yup.string().required('Required'),
            screenSize: Yup.string().required('Required'),
            screenType: Yup.string().required('Required'),
            hardwareOwner: Yup.string().required('Required'),
            rentalVendor: Yup.string(),
            hardwareCondition: Yup.string().required('Required'),
            location: Yup.string().required('Required'),
            building: Yup.string().required('Required'),
            purchaseDate: Yup.string().required('Required'),
            soldDate: Yup.string(),
            returnDate: Yup.string(),
            remarks: Yup.string()
        }),
        onSubmit: (values, { resetForm }) => {
            setLoading(true)
            let payload = {
                hardware_id: {
                    serial_no: values.serialNumber,
                    type: values.hardwareType,
                    owner: values.hardwareOwner,
                    condition: values.hardwareCondition,
                    location: values.location,
                    building: values.building,
                    purchased_date: values.purchaseDate,
                },
                brand: values.brand,
                processor: values.processor,
                ram_capacity: values.ramCapacity,
                storage_capacity: values.storageCapacity,
                screen_size: values.screenSize,
                is_touch: values.screenType,
            }
            createNewLaptop(payload)
                .unwrap()
                .then((res) => {
                    setOpen(true)
                    resetForm();
                })
                .catch((error) => {
                    Object.entries(error.data).forEach(([field, message]: [string, any]) => { // TODO: Change this
                        const formField: string = getKeyByValue(laptopFieldMapping, field)!;
                        formik.setFieldError(formField, message)
                    })
                })
                .finally(() => setLoading(false))
        },
    })

    function handleClose(event: Event | React.SyntheticEvent<any, Event>, reason: SnackbarCloseReason) {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    }

    console.log("render")
    return (
        <Box sx={{ maxWidth: "80%", margin: "auto", py: 3 }}>
            <Typography variant="h4" component="h1" gutterBottom>
                Add New Hardware
            </Typography>
            <Divider />
            {loading ? <LinearProgress /> : null}
            <Box sx={{ pt: 3 }}>
                <form onSubmit={formik.handleSubmit}>
                    <Grid container spacing={3}>
                        <Grid item xs={6} hidden={config.hardwareId.hidden}>
                            <TextField
                                fullWidth
                                id="hardwareId"
                                name="hardwareId"
                                label={config.hardwareId.label}
                                variant="outlined"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.hardwareId}
                                error={Boolean(formik.touched.hardwareId && formik.errors.hardwareId)}
                                helperText={
                                    formik.touched.hardwareId && formik.errors.hardwareId
                                        ? String(formik.errors.hardwareId)
                                        : null
                                }
                            />
                        </Grid>
                        <Grid item xs={6} hidden={config.serialNumber.hidden}>
                            <TextField
                                fullWidth
                                id="serialNumber"
                                name="serialNumber"
                                label={config.serialNumber.label}
                                variant="outlined"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.serialNumber}
                                error={Boolean(formik.touched.serialNumber && formik.errors.serialNumber)}
                                helperText={
                                    formik.touched.serialNumber && formik.errors.serialNumber
                                        ? String(formik.errors.serialNumber)
                                        : null
                                }
                            />
                        </Grid>
                        <Grid item xs={6} hidden={config.hardwareType.hidden}>
                            <FormControl sx={{ minWidth: 250 }} fullWidth>
                                <InputLabel id="hardware-type">{config.hardwareType.label}</InputLabel>
                                <Select
                                    defaultValue=""
                                    id="hardwareType"
                                    name="hardwareType"
                                    label={config.hardwareType.label}
                                    labelId="hardware-type"
                                    value={formik.values.hardwareType}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur("hardwareType")}
                                    error={
                                        Boolean(formik.touched.hardwareType && formik.errors.hardwareType)
                                    }
                                >
                                    {locations
                                        ? hardwareTypes?.results.map((type: any) => { // TODO: change this
                                            return (
                                                <MenuItem
                                                    key={type.id}
                                                    value={type.id}
                                                >
                                                    {type.name}
                                                </MenuItem>
                                            );
                                        })
                                        : null}
                                </Select>
                                <FormHelperText error>
                                    {formik.touched.hardwareType && formik.errors.hardwareType
                                        ? formik.errors.hardwareType
                                        : null}
                                </FormHelperText>
                            </FormControl>
                        </Grid>
                        <Grid item xs={6} hidden={config.hardwareOwner.hidden}>
                            <FormControl sx={{ minWidth: 250 }} fullWidth>
                                <InputLabel id="hardwareOwner">{config.hardwareOwner.label}</InputLabel>
                                <Select
                                    defaultValue=""
                                    id="hardwareOwner"
                                    name="hardwareOwner"
                                    label={config.hardwareOwner.label}
                                    labelId="hardwareOwner"
                                    value={formik.values.hardwareOwner}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur("hardwareOwner")}
                                    error={
                                        Boolean(formik.touched.hardwareOwner && formik.errors.hardwareOwner)
                                    }
                                >
                                    {hardwareOwners
                                        ? hardwareOwners.results.map((owner) => {
                                            return (
                                                <MenuItem
                                                    key={owner.id}
                                                    value={owner.id}
                                                >
                                                    {owner.name}
                                                </MenuItem>
                                            );
                                        })
                                        : null}
                                </Select>
                                <FormHelperText error>
                                    {formik.touched.hardwareOwner && formik.errors.hardwareOwner
                                        ? formik.errors.hardwareOwner
                                        : null}
                                </FormHelperText>
                            </FormControl>
                        </Grid>
                        <Grid
                            item xs={6}
                            hidden={
                                config.rentalVendor.hidden ||
                                formik.values.hardwareOwner != 'Rental'
                            }
                        > {/* TODO: change to Select comp. */}
                            <TextField
                                fullWidth
                                id="rentalVendor"
                                name="rentalVendor"
                                label={config.rentalVendor.label}
                                variant="outlined"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.rentalVendor}
                                error={Boolean(formik.touched.rentalVendor && formik.errors.rentalVendor)}
                                helperText={
                                    formik.touched.rentalVendor && formik.errors.rentalVendor
                                        ? String(formik.errors.rentalVendor)
                                        : null
                                }
                            />
                        </Grid>
                        <Grid item xs={6} hidden={config.hardwareCondition.hidden}>
                            <FormControl sx={{ minWidth: 250 }} fullWidth>
                                <InputLabel id="hardwareCondition">{config.hardwareCondition.label}</InputLabel>
                                <Select
                                    defaultValue=""
                                    id="hardwareCondition"
                                    name="hardwareCondition"
                                    label={config.hardwareCondition.label}
                                    labelId="hardwareCondition"
                                    value={formik.values.hardwareCondition}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur("hardwareCondition")}
                                    error={
                                        Boolean(formik.touched.hardwareCondition && formik.errors.hardwareCondition)
                                    }
                                >
                                    {hardwareConditions
                                        ? hardwareConditions.results.map((condition) => { // TODO: change this
                                            return (
                                                <MenuItem
                                                    key={condition.id}
                                                    value={condition.id}
                                                >
                                                    {condition.condition}
                                                </MenuItem>
                                            );
                                        })
                                        : null}
                                </Select>
                                <FormHelperText error>
                                    {formik.touched.hardwareCondition && formik.errors.hardwareCondition
                                        ? formik.errors.hardwareCondition
                                        : null}
                                </FormHelperText>
                            </FormControl>
                        </Grid>
                        <Grid item xs={6} hidden={config.location.hidden}>
                            <FormControl sx={{ minWidth: 250 }} fullWidth>
                                <InputLabel id="location-label">{config.location.label}</InputLabel>
                                <Select
                                    defaultValue=""
                                    id="location"
                                    name="location"
                                    label={config.location.label}
                                    labelId="location-label"
                                    value={formik.values.location}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur("location")}
                                    error={
                                        Boolean(formik.touched.location && formik.errors.location)
                                    }
                                >
                                    {locations
                                        ? locations.results.map((location: any) => { // TODO: change this
                                            return (
                                                <MenuItem
                                                    key={location.location_id}
                                                    value={location.location_id}
                                                >
                                                    {location.location}
                                                </MenuItem>
                                            );
                                        })
                                        : null}
                                </Select>
                                <FormHelperText error>
                                    {formik.touched.location && formik.errors.location
                                        ? formik.errors.location
                                        : null}
                                </FormHelperText>
                            </FormControl>
                        </Grid>
                        <Grid item xs={6} hidden={config.building.hidden}>
                            <FormControl sx={{ minWidth: 250 }} fullWidth>
                                <InputLabel id="building-label">{config.building.label}</InputLabel>
                                <Select
                                    defaultValue=""
                                    id="building"
                                    name="building"
                                    label={config.building.label}
                                    labelId="building-label"
                                    value={formik.values.building}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur("building")}
                                    error={
                                        Boolean(formik.touched.building && formik.errors.building)
                                    }
                                >
                                    {buildings
                                        ? buildings.results.map((building: any) => { // TODO: change this
                                            return (
                                                <MenuItem
                                                    key={building.id}
                                                    value={building.id}
                                                >
                                                    {building.building}
                                                </MenuItem>
                                            );
                                        })
                                        : null}
                                </Select>
                                <FormHelperText error>
                                    {formik.touched.building && formik.errors.building
                                        ? formik.errors.building
                                        : null}
                                </FormHelperText>
                            </FormControl>
                        </Grid>
                        <Grid item xs={6} hidden={config.brand.hidden && +formik.values.hardwareType !== 1}>
                            <FormControl sx={{ minWidth: 250 }} fullWidth>
                                <InputLabel id="brand-label">{config.brand.label}</InputLabel>
                                <Select
                                    defaultValue=""
                                    id="brand"
                                    name="brand"
                                    label={config.brand.label}
                                    labelId="brand-label"
                                    value={formik.values.brand}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur("brand")}
                                    error={Boolean(formik.touched.brand && formik.errors.brand)}
                                >
                                    {laptopBrands
                                        ? laptopBrands.results.map((department: any) => { // TODO: change this
                                            return (
                                                <MenuItem
                                                    key={department.id}
                                                    value={department.id}
                                                >
                                                    {department.brand_name}
                                                </MenuItem>
                                            )
                                        })
                                        : null}
                                </Select>
                                <FormHelperText error>
                                    {formik.touched.brand && formik.errors.brand
                                        ? formik.errors.brand
                                        : null}
                                </FormHelperText>
                            </FormControl>
                        </Grid>
                        <Grid item xs={6} hidden={config.processor.hidden && +formik.values.hardwareType !== 1}>
                            <TextField
                                fullWidth
                                id="processor"
                                name="processor"
                                label={config.processor.label}
                                variant="outlined"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.processor}
                                error={Boolean(formik.touched.processor && formik.errors.processor)}
                                helperText={
                                    formik.touched.processor && formik.errors.processor
                                        ? String(formik.errors.processor)
                                        : null
                                }
                            />
                        </Grid>
                        <Grid item xs={6} hidden={config.ramCapacity.hidden && +formik.values.hardwareType !== 1}>
                            <TextField
                                fullWidth
                                id="ramCapacity"
                                name="ramCapacity"
                                label={config.ramCapacity.label}
                                variant="outlined"
                                type='number'
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.ramCapacity}
                                error={Boolean(formik.touched.ramCapacity && formik.errors.ramCapacity)}
                                helperText={
                                    formik.touched.ramCapacity && formik.errors.ramCapacity
                                        ? String(formik.errors.ramCapacity)
                                        : null
                                }
                            />
                        </Grid>
                        <Grid item xs={6} hidden={config.storageCapacity.hidden && +formik.values.hardwareType !== 1}>
                            <TextField
                                fullWidth
                                id="storageCapacity"
                                name="storageCapacity"
                                label={config.storageCapacity.label}
                                variant="outlined"
                                type='number'
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.storageCapacity}
                                error={Boolean(formik.touched.storageCapacity && formik.errors.storageCapacity)}
                                helperText={
                                    formik.touched.storageCapacity && formik.errors.storageCapacity
                                        ? String(formik.errors.storageCapacity)
                                        : null
                                }
                            />
                        </Grid>
                        <Grid item xs={6} hidden={config.screenSize.hidden && +formik.values.hardwareType !== 1}>
                            <FormControl sx={{ minWidth: 250 }} fullWidth>
                                <InputLabel id="screenSize-label">{config.screenSize.label}</InputLabel>
                                <Select
                                    defaultValue=""
                                    id="screenSize"
                                    name="screenSize"
                                    label={config.screenSize.label}
                                    labelId="screenSize-label"
                                    value={formik.values.screenSize}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur("screenSize")}
                                    error={Boolean(formik.touched.screenSize && formik.errors.screenSize)}
                                >
                                    {screenSizes
                                        ? screenSizes.results.map((screenSize: any) => { // TODO: change this
                                            return (
                                                <MenuItem
                                                    key={screenSize.id}
                                                    value={screenSize.id}
                                                >
                                                    {screenSize.size_range}
                                                </MenuItem>
                                            )
                                        })
                                        : null}
                                </Select>
                                <FormHelperText error>
                                    {formik.touched.brand && formik.errors.brand
                                        ? formik.errors.brand
                                        : null}
                                </FormHelperText>
                            </FormControl>
                        </Grid>
                        <Grid item xs={6} hidden={config.screenType.hidden && +formik.values.hardwareType !== 1}>
                            <FormControl sx={{ minWidth: 250 }} fullWidth>
                                <InputLabel id="screenType-label">{config.screenType.label}</InputLabel>
                                <Select
                                    defaultValue=""
                                    id="screenType"
                                    name="screenType"
                                    label={config.screenType.label}
                                    type='checkbox'
                                    labelId="screenType-label"
                                    value={formik.values.screenType}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur("screenType")}
                                    error={
                                        Boolean(formik.touched.screenType && formik.errors.screenType)
                                    }
                                >
                                    <MenuItem
                                        value={'False'}
                                    >
                                        {'Non Touch'}
                                    </MenuItem>
                                    <MenuItem
                                        value={'True'}
                                    >
                                        {'Non Touch'}
                                    </MenuItem>
                                </Select>
                                <FormHelperText error>
                                    {formik.touched.screenType && formik.errors.screenType
                                        ? formik.errors.screenType
                                        : null}
                                </FormHelperText>
                            </FormControl>
                        </Grid>
                        <Grid item xs={6} hidden={config.purchaseDate.hidden}>
                            <TextField
                                fullWidth
                                type="date"
                                id="purchaseDate"
                                name="purchaseDate"
                                label={config.purchaseDate.label}
                                variant="outlined"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.purchaseDate}
                                error={Boolean(formik.touched.purchaseDate && formik.errors.purchaseDate)}
                                helperText={
                                    formik.touched.purchaseDate && formik.errors.purchaseDate
                                        ? String(formik.errors.purchaseDate)
                                        : null
                                }
                            />
                        </Grid>
                        <Grid item xs={6} hidden={config.soldDate.hidden}>
                            <TextField
                                fullWidth
                                type="date"
                                id="soldDate"
                                name="soldDate"
                                label={config.soldDate.label}
                                variant="outlined"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.soldDate}
                                error={Boolean(formik.touched.soldDate && formik.errors.soldDate)}
                                helperText={
                                    formik.touched.soldDate && formik.errors.soldDate
                                        ? String(formik.errors.soldDate)
                                        : null
                                }
                            />
                        </Grid>
                        <Grid item xs={6} hidden={config.returnDate.hidden}>
                            <TextField
                                fullWidth
                                type="date"
                                id="returnDate"
                                name="returnDate"
                                label={config.returnDate.label}
                                variant="outlined"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.returnDate}
                                error={Boolean(formik.touched.returnDate && formik.errors.returnDate)}
                                helperText={
                                    formik.touched.returnDate && formik.errors.returnDate
                                        ? String(formik.errors.returnDate)
                                        : null
                                }
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Button type="submit" variant="contained">
                                Submit
                            </Button>
                        </Grid>
                    </Grid>
                </form>
                <Snackbar open={open} autoHideDuration={4000} onClose={handleClose}>
                    <Alert
                        onClose={() => handleClose}
                        severity="success"
                        sx={{ width: "100%" }}
                    >
                        Laptop Added Successfully
                    </Alert>
                </Snackbar>
            </Box>
        </Box>
    );
}