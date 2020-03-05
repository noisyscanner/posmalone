export default {
  clinic: {
    name: 'Malindi Sub-County Hospital',
    meta: {
      active: true,
      created: '2019-08-31T03:37:03.000Z',
    },
    organisation: '5966befc-7588-42f8-909f-c5efbb405e80',
    service: 'a72dc87b-8810-4a4e-8fbf-9ba85b65d8d4',
    addresses: [
      {
        country: 'KE',
        location: [],
        city: 'Malindi',
        street: 'P. O. Box 4-80200',
        state: 'Kilifi',
      },
    ],
  },
  invoice: {
    uuid: 'ee1b921f-2209-4b22-8049-41120702a6cf',
    type: 'Outpatient',
    admission: {
      ward: null,
      admissionNumber: null,
      admissionDate: null,
      dischargeDate: null,
    },
    status: 'BALANCED',
    currency: 'KES',
    total: 8090,
    invoiceNumber: '55',
    balance: {
      paid: true,
      patient: 8090,
      insurer: 0,
    },
    issuer: {
      clinic: 'cc5635c7-332d-4710-a493-62f7ffd0188d',
      unit: '5966befc-7588-42f8-909f-c5efbb405e80',
      reporterDetails: {
        uuid: '5cc344bf-cbe9-413d-9c8f-63b31108ccae',
        person: {
          firstname: 'Clinic',
          lastname: 'Reed',
        },
      },
    },
    transactions: [
      {
        uuid: '55cc52db-e984-4b3d-b1a3-9004c059f6df',
        method: 'MPESA',
        type: 'PAYMENT',
        authCode: 'MPESACODE5',
        price: {
          amount: 8090,
          waivedAmount: 0,
          currency: 'KES',
        },
      },
    ],
    careEvents: [
      {
        insuranceScheme: '',
        quantity: 1,
        revenueDepartment: 'Pharmacy',
        status: 'PAID',
        price: {
          amount: 40,
          totalAmount: 40,
          currency: 'KES',
        },
        eventPrice: {
          uuid: '9b4371c1-db28-4f67-a216-0a31ee1e2ca6',
          name:
            'Chloramphenical 125mg/5ml Suspension and some other really long stuff that wont fit on one line',
          unitOfMeasure: '',
          code: '26.1653',
          revenueDepartment: 'Pharmacy',
          careRequest: 'Prescription',
          currencyDetails: {
            uuid: '6d300ea6-8421-4678-88ad-7c33a71bb877',
            code: 'KES',
            displayFormat: '/(\\d)(?=(\\d{3})+(?!\\d))/g',
          },
          service: 'cc5635c7-332d-4710-a493-62f7ffd0188d',
          organisation: '5966befc-7588-42f8-909f-c5efbb405e80',
          payers: [
            {
              name: 'patient',
              amount: 40,
            },
          ],
        },
      },
      {
        insuranceScheme: '',
        quantity: 1,
        revenueDepartment: 'Laboratory',
        status: 'PAID',
        price: {
          amount: 50,
          totalAmount: 50,
          currency: 'KES',
        },
        eventPrice: {
          uuid: 'bb895a69-13d2-463c-9ce9-7dd3be421694',
          name: 'Blood Slide for Malaria (MPS)',
          unitOfMeasure: '',
          code: '8.1111',
          revenueDepartment: 'Laboratory',
          careRequest: 'Investigation',
          currencyDetails: {
            uuid: '6d300ea6-8421-4678-88ad-7c33a71bb877',
            code: 'KES',
            displayFormat: '/(\\d)(?=(\\d{3})+(?!\\d))/g',
          },
          service: 'cc5635c7-332d-4710-a493-62f7ffd0188d',
          organisation: '5966befc-7588-42f8-909f-c5efbb405e80',
          payers: [
            {
              name: 'patient',
              amount: 50,
            },
          ],
        },
      },
      {
        insuranceScheme: '',
        quantity: 1,
        revenueDepartment: 'Orthopaedic technology',
        status: 'PAID',
        price: {
          amount: 8000,
          totalAmount: 8000,
          currency: 'KES',
        },
        eventPrice: {
          uuid: '277d6e06-055f-414a-9385-1576d7a7b958',
          name: 'Spinal Support Brace (Adult)',
          unitOfMeasure: '',
          code: '16.1284',
          revenueDepartment: 'Orthopaedic technology',
          careRequest: 'Other',
          currencyDetails: {
            uuid: '6d300ea6-8421-4678-88ad-7c33a71bb877',
            code: 'KES',
            displayFormat: '/(\\d)(?=(\\d{3})+(?!\\d))/g',
          },
          service: 'cc5635c7-332d-4710-a493-62f7ffd0188d',
          organisation: '5966befc-7588-42f8-909f-c5efbb405e80',
          payers: [
            {
              name: 'patient',
              amount: 8000,
            },
          ],
        },
      },
    ],
    meta: {
      created: '2020-03-04T14:51:02.000Z',
    },
    totalPaid: 8090,
    totalWaived: 0,
  },
  patientDetails: {
    uuid: '03b77c24-4cb9-4e6a-830b-18b002b6e7fc',
    basicInformation: {
      firstname: 'Brad',
      lastname: 'Reed',
      dob: '1997-12-17T00:00:00.000Z',
      gender: 'm',
      languages: [],
      maritalstatus: 'UNK',
      uuid: '03b77c24-4cb9-4e6a-830b-18b002b6e7fc',
    },
    uids: [],
    addresses: {},
    contactPoints: [],
    nextOfKin: {},
  },
  passportID: '106686160150',
};
