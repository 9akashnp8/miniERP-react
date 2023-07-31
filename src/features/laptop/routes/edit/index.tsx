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
import { useParams, useNavigate } from 'react-router-dom';

import { Alert } from '../../../common/components/Alert';
import Grid from '../../../common/components/Grid';
import { laptopFieldMapping } from '../../utils/constants';
import { getKeyByValue } from '../../../common/utils/functions';
import config from './config';
import {
    useUpdateLaptopMutation,
    useGetLaptopScreenTypesQuery,
    useGetLaptopOwnerTypesQuery,
    useGetLaptopStatusesQuery,
} from '../../laptopsApiSlice';
import { useGetBranchesQuery } from '../../../employee/branchApiSlice';
import { useGetBrandsQuery } from '../../laptopBrandApiSlice';
import { useGetBuildingsQuery } from '../../../common/buildingApiSlice';
import { useGetLaptopDetailQuery } from '../../laptopsApiSlice';
import { getCurrentDate } from '../../../../lib/utils';

export default function () {
    const { id } = useParams();
    const navigate = useNavigate();
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const { data: laptop } = useGetLaptopDetailQuery({id: id})
    const { data: laptopBrands } = useGetBrandsQuery();
    const { data: buildings } = useGetBuildingsQuery();
    const { data: screenTypes } = useGetLaptopScreenTypesQuery();
    const { data: ownerTypes } = useGetLaptopOwnerTypesQuery();
    const { data: laptopStatuses } = useGetLaptopStatusesQuery();
    const { data: locations } = useGetBranchesQuery();
    const [ updateLaptop ] = useUpdateLaptopMutation();
    const formik = useFormik({
        initialValues: {
            hardwareId: laptop?.hardware_id || '',
            serialNumber: laptop?.laptop_sr_no || '',
            brand: laptop?.brand?.id || undefined,
            processor: laptop?.processor || '',
            ramCapacity: laptop?.ram_capacity || '',
            storageCapacity: laptop?.storage_capacity || '',
            screenSize: laptop?.screen_size || '',
            screenType: laptop?.screen_type  || '',
            laptopOwner: laptop?.laptop_owner_type || '',
            rentalVendor: laptop?.laptop_rental_vendor || '',
            laptopStatus: laptop?.laptop_status || '',
            location: laptop?.laptop_branch?.location_id || undefined,
            building: laptop?.laptop_building?.id || undefined,
            purchaseDate: laptop?.laptop_date_purchased || '',
            soldDate: laptop?.laptop_date_sold || undefined,
            returnDate: laptop?.laptop_date_returned || undefined,
            remarks: laptop?.remarks || ''
        },
        validationSchema: Yup.object({
            hardwareId: Yup.string(),
            serialNumber: Yup.string().required('Required'),
            brand: Yup.string().required('Required'),
            processor: Yup.string().required('Required'),
            ramCapacity: Yup.string().required('Required'),
            storageCapacity: Yup.string().required('Required'),
            screenSize: Yup.string().required('Required'),
            screenType: Yup.string().required('Required'),
            laptopOwner: Yup.string().required('Required'),
            rentalVendor: Yup.string(),
            laptopStatus: Yup.string().required('Required'),
            location: Yup.string().required('Required'),
            building: Yup.string().required('Required'),
            purchaseDate: Yup.string().required('Required'),
            soldDate: Yup.string(),
            returnDate: Yup.string(),
            remarks: Yup.string()
        }),
        onSubmit: (values, { resetForm }) => {
            setLoading(true)
            let payload = {}
            for (const [key, value] of Object.entries(values)) {
                const obj = Object.fromEntries([[laptopFieldMapping[key], value]])
                Object.assign(payload, obj)
            }
            updateLaptop({ id: id, payload: payload })
                .unwrap()
                .then((res) => {
                    setOpen(true);
                    setTimeout(() => {
                        navigate('/laptop/')
                    }, 1000)
                })
                .catch((error) => {
                    // Object.entries(error.data).forEach(([field, message]: [string, any]) => { // TODO: Change this
                    //     formik.setFieldError(FORM_DB_FIELD_MAPPING[field as keyof FormFieldMapping], message)
                    // })
                })
                .finally(() => setLoading(false))
        }
    })

    function handleClose(event: Event | React.SyntheticEvent<any, Event>, reason: SnackbarCloseReason) {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    }


    return (
        <Box sx={{ maxWidth: "80%", margin: "auto", py: 3 }}>
            <Typography variant="h4" component="h1" gutterBottom>
                Edit Laptop
            </Typography>
            <Divider />
            {loading ? <LinearProgress /> : null}
            <Box sx={{ pt: 3 }}>
                <form onSubmit={formik.handleSubmit}>
                    <Grid container spacing={3}>
                        <Grid item xs={6} hidden={!config.hardwareId.visible}>
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
                        <Grid item xs={6} hidden={!config.serialNumber.visible}>
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
                        <Grid item xs={6} hidden={!config.brand.visible}>
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
                                        ? String(formik.errors.brand)
                                        : null}
                                </FormHelperText>
                            </FormControl>
                        </Grid>
                        <Grid item xs={6} hidden={!config.processor.visible}>
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
                        <Grid item xs={6} hidden={!config.ramCapacity.visible}>
                            <TextField
                                fullWidth
                                id="ramCapacity"
                                name="ramCapacity"
                                label={config.ramCapacity.label}
                                variant="outlined"
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
                        <Grid item xs={6} hidden={!config.storageCapacity.visible}>
                            <TextField
                                fullWidth
                                id="storageCapacity"
                                name="storageCapacity"
                                label={config.storageCapacity.label}
                                variant="outlined"
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
                        <Grid item xs={6} hidden={!config.screenSize.visible}> {/* TODO: change to Select comp. */}
                            <TextField
                                fullWidth
                                id="screenSize"
                                name="screenSize"
                                label={config.screenSize.label}
                                variant="outlined"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.screenSize}
                                error={Boolean(formik.touched.screenSize && formik.errors.screenSize)}
                                helperText={
                                    formik.touched.screenSize && formik.errors.screenSize
                                        ? String(formik.errors.screenSize)
                                        : null
                                }
                            />
                        </Grid>
                        <Grid item xs={6} hidden={!config.screenType.visible}>
                            <FormControl sx={{ minWidth: 250 }} fullWidth>
                                <InputLabel id="screenType-label">{config.screenType.label}</InputLabel>
                                <Select
                                    defaultValue=""
                                    id="screenType"
                                    name="screenType"
                                    label={config.screenType.label}
                                    labelId="screenType-label"
                                    value={formik.values.screenType}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur("screenType")}
                                    error={
                                        Boolean(formik.touched.screenType && formik.errors.screenType)
                                    }
                                >
                                    {screenTypes
                                        ? screenTypes.laptop_screen_types.map((screenType: any) => { // TODO: change this
                                            return (
                                                <MenuItem
                                                    key={screenType.id}
                                                    value={screenType.value}
                                                >
                                                    {screenType.label}
                                                </MenuItem>
                                            );
                                        })
                                        : null}
                                </Select>
                                <FormHelperText error>
                                    {formik.touched.screenType && formik.errors.screenType
                                        ? String(formik.errors.screenType)
                                        : null}
                                </FormHelperText>
                            </FormControl>
                        </Grid>
                        <Grid item xs={6} hidden={!config.laptopOwner.visible}>
                            <FormControl sx={{ minWidth: 250 }} fullWidth>
                                <InputLabel id="laptopOwner-label">{config.laptopOwner.label}</InputLabel>
                                <Select
                                    defaultValue=""
                                    id="laptopOwner"
                                    name="laptopOwner"
                                    label={config.laptopOwner.label}
                                    labelId="laptopOwner-label"
                                    value={formik.values.laptopOwner}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur("laptopOwner")}
                                    error={
                                        Boolean(formik.touched.laptopOwner && formik.errors.laptopOwner)
                                    }
                                >
                                    {ownerTypes
                                        ? ownerTypes.laptop_owner_types.map((ownerType: any) => { // TODO: change this
                                            return (
                                                <MenuItem
                                                    key={ownerType.id}
                                                    value={ownerType.value}
                                                >
                                                    {ownerType.label}
                                                </MenuItem>
                                            );
                                        })
                                        : null}
                                </Select>
                                <FormHelperText error>
                                    {formik.touched.laptopOwner && formik.errors.laptopOwner
                                        ? String(formik.errors.laptopOwner)
                                        : null}
                                </FormHelperText>
                            </FormControl>
                        </Grid>
                        <Grid
                            item xs={6}
                            hidden={
                                !config.rentalVendor.visible ||
                                formik.values.laptopOwner != 'Rental'
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
                        <Grid item xs={6} hidden={!config.laptopStatus.visible}>
                            <FormControl sx={{ minWidth: 250 }} fullWidth>
                                <InputLabel id="laptopStatus-label">{config.laptopStatus.label}</InputLabel>
                                <Select
                                    defaultValue=""
                                    id="laptopStatus"
                                    name="laptopStatus"
                                    label={config.laptopStatus.label}
                                    labelId="laptopStatus-label"
                                    value={formik.values.laptopStatus}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur("laptopStatus")}
                                    error={
                                        Boolean(formik.touched.laptopStatus && formik.errors.laptopStatus)
                                    }
                                >
                                    {laptopStatuses
                                        ? laptopStatuses.laptop_statuses.map((laptopStatus: any) => { // TODO: change this
                                            return (
                                                <MenuItem
                                                    key={laptopStatus.id}
                                                    value={laptopStatus.value}
                                                >
                                                    {laptopStatus.label}
                                                </MenuItem>
                                            );
                                        })
                                        : null}
                                </Select>
                                <FormHelperText error>
                                    {formik.touched.laptopStatus && formik.errors.laptopStatus
                                        ? String(formik.errors.laptopStatus)
                                        : null}
                                </FormHelperText>
                            </FormControl>
                        </Grid>
                        <Grid item xs={6} hidden={!config.location.visible}>
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
                                        ? String(formik.errors.location)
                                        : null}
                                </FormHelperText>
                            </FormControl>
                        </Grid>
                        <Grid item xs={6} hidden={!config.building.visible}>
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
                                        ? String(formik.errors.building)
                                        : null}
                                </FormHelperText>
                            </FormControl>
                        </Grid>
                        <Grid item xs={6} hidden={!config.purchaseDate.visible}>
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
                        <Grid item xs={6} hidden={!config.soldDate.visible}>
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
                        <Grid item xs={6} hidden={!config.returnDate.visible}>
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
                        <Grid item xs={12} hidden={!config.remarks.visible}>
                            <TextField
                                fullWidth
                                multiline
                                rows={3}
                                id="remarks"
                                name="remarks"
                                label={config.remarks.label}
                                variant="outlined"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.remarks}
                                error={Boolean(formik.touched.remarks && formik.errors.remarks)}
                                helperText={
                                    formik.touched.remarks && formik.errors.remarks
                                        ? String(formik.errors.remarks)
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
                        Laptop Edited Successfully
                    </Alert>
                </Snackbar>
            </Box>
        </Box>
    );
}