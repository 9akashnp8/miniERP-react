// Page Settings, this should later come from backend

export default {
    hardwareId: {
        hidden: true,
        label: 'Hardware ID',
        fieldFor: 'common'
    },
    serialNumber: {
        hidden: false,
        label: 'Serial Number',
        fieldFor: 'common'
    },
    hardwareType: {
        hidden: false,
        label: 'Hardware Type',
        fieldFor: 'common'
    },
    brand: {
        hidden: true,
        label: 'Brand',
        fieldFor: 'laptop'
    },
    processor: {
        hidden: true,
        label: 'Processor',
        fieldFor: 'laptop'
    },
    ramCapacity: {
        hidden: true,
        label: 'RAM (GB)',
        fieldFor: 'laptop'
    },
    storageCapacity: {
        hidden: true,
        label: 'Storage (GB)',
        fieldFor: 'laptop'
    },
    screenSize: {
        hidden: true,
        label: 'Screen Size',
        fieldFor: 'laptop'
    },
    screenType: {
        hidden: true,
        label: 'Screen Type',
        fieldFor: 'laptop'
    },
    hardwareOwner: {
        hidden: false,
        label: 'Hardware Owner',
        fieldFor: 'common'
    },
    rentalVendor: { // TODO: not required
        hidden: false,
        label: 'Rental Vendor',
        fieldFor: 'common'
    },
    hardwareCondition: {
        hidden: false,
        label: 'Condition',
        fieldFor: 'common'
    },
    location: {
        hidden: false,
        label: 'Location',
        fieldFor: 'common'
    },
    building: {
        hidden: false,
        label: 'Building',
        fieldFor: 'common'
    },
    purchaseDate: {
        hidden: false,
        label: 'Purchase Date',
        fieldFor: 'common'
    },
    soldDate: {
        hidden: false,
        label: 'Date Sold',
        fieldFor: 'common'
    },
    returnDate: {
        hidden: false,
        label: 'Date Returned',
        fieldFor: 'common'
    },
    remarks: {
        hidden: false,
        label: 'Remarks',
        fieldFor: 'common'
    }
}