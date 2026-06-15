/**
 * Emergency Facilities Database
 * Packaged location data for offline use — no API calls needed
 * Covers major metros across India with 25km radius resolution
 */

export const FACILITY_TYPES = {
  HOSPITAL: 'hospital',
  POLICE: 'police',
  TRAUMA: 'trauma',
  FIRE: 'fire',
};

export const FACILITIES = [
  /* ═══════════════════════════════════
     MUMBAI REGION
  ═══════════════════════════════════ */
  {
    id: 'mum-h-001', type: FACILITY_TYPES.HOSPITAL,
    name: 'KEM Hospital', shortName: 'KEM',
    lat: 19.0038, lng: 72.8408,
    phone: '022-24136051', emergency: '022-24136000',
    address: 'Acharya Donde Marg, Parel, Mumbai',
    beds: 1800, trauma: true, icu: true, open24x7: true,
    rating: 4.2,
  },
  {
    id: 'mum-h-002', type: FACILITY_TYPES.HOSPITAL,
    name: 'Lokmanya Tilak Municipal General Hospital', shortName: 'Sion Hospital',
    lat: 19.0453, lng: 72.8631,
    phone: '022-24076381', emergency: '022-24076381',
    address: 'Dr Babasaheb Ambedkar Rd, Sion, Mumbai',
    beds: 1500, trauma: true, icu: true, open24x7: true,
    rating: 4.0,
  },
  {
    id: 'mum-h-003', type: FACILITY_TYPES.HOSPITAL,
    name: 'Nair Hospital', shortName: 'Nair',
    lat: 18.9696, lng: 72.8363,
    phone: '022-23027600', emergency: '022-23027601',
    address: 'Dr AL Nair Rd, Mumbai Central, Mumbai',
    beds: 1200, trauma: true, icu: true, open24x7: true,
    rating: 4.1,
  },
  {
    id: 'mum-h-004', type: FACILITY_TYPES.HOSPITAL,
    name: 'Fortis Hospital Mulund', shortName: 'Fortis Mulund',
    lat: 19.1726, lng: 72.9573,
    phone: '022-67919191', emergency: '022-67919191',
    address: 'Mulund Goregaon Link Road, Mulund West, Mumbai',
    beds: 300, trauma: true, icu: true, open24x7: true,
    rating: 4.5,
  },
  {
    id: 'mum-h-005', type: FACILITY_TYPES.HOSPITAL,
    name: 'Lilavati Hospital', shortName: 'Lilavati',
    lat: 19.0558, lng: 72.8290,
    phone: '022-26751000', emergency: '022-26751000',
    address: 'A-791, Bandra Reclamation, Bandra West, Mumbai',
    beds: 323, trauma: true, icu: true, open24x7: true,
    rating: 4.6,
  },
  {
    id: 'mum-t-001', type: FACILITY_TYPES.TRAUMA,
    name: 'LTMG Trauma Centre', shortName: 'Sion Trauma',
    lat: 19.0490, lng: 72.8640,
    phone: '022-24076381', emergency: '022-24076381',
    address: 'Sion Hospital Campus, Sion, Mumbai',
    beds: 80, trauma: true, icu: true, open24x7: true,
    rating: 4.3,
  },
  {
    id: 'mum-p-001', type: FACILITY_TYPES.POLICE,
    name: 'Mumbai Police Control Room', shortName: 'Police Control',
    lat: 18.9388, lng: 72.8355,
    phone: '100', emergency: '100',
    address: 'Crawford Market, Mumbai',
    open24x7: true,
  },
  {
    id: 'mum-p-002', type: FACILITY_TYPES.POLICE,
    name: 'Bandra Police Station', shortName: 'Bandra PS',
    lat: 19.0596, lng: 72.8295,
    phone: '022-26422212', emergency: '100',
    address: 'Bandra West, Mumbai',
    open24x7: true,
  },
  {
    id: 'mum-p-003', type: FACILITY_TYPES.POLICE,
    name: 'Andheri Police Station', shortName: 'Andheri PS',
    lat: 19.1197, lng: 72.8465,
    phone: '022-26821101', emergency: '100',
    address: 'Andheri West, Mumbai',
    open24x7: true,
  },
  {
    id: 'mum-f-001', type: FACILITY_TYPES.FIRE,
    name: 'Mumbai Fire Brigade HQ', shortName: 'Fire HQ',
    lat: 18.9480, lng: 72.8310,
    phone: '101', emergency: '101',
    address: 'Byculla, Mumbai',
    open24x7: true,
  },

  /* ═══════════════════════════════════
     CHENNAI REGION (IITM Area)
  ═══════════════════════════════════ */
  {
    id: 'che-h-001', type: FACILITY_TYPES.HOSPITAL,
    name: 'Government General Hospital', shortName: 'GGH Chennai',
    lat: 13.0777, lng: 80.2785,
    phone: '044-25305000', emergency: '044-25305000',
    address: 'Park Town, Chennai',
    beds: 2500, trauma: true, icu: true, open24x7: true,
    rating: 4.0,
  },
  {
    id: 'che-h-002', type: FACILITY_TYPES.HOSPITAL,
    name: 'Apollo Hospitals Greams Road', shortName: 'Apollo Chennai',
    lat: 13.0569, lng: 80.2527,
    phone: '044-28296060', emergency: '1066',
    address: '21 Greams Lane, Off Greams Road, Chennai',
    beds: 700, trauma: true, icu: true, open24x7: true,
    rating: 4.7,
  },
  {
    id: 'che-h-003', type: FACILITY_TYPES.HOSPITAL,
    name: 'Sri Ramachandra Institute', shortName: 'SRIHER',
    lat: 13.0359, lng: 80.1576,
    phone: '044-45928400', emergency: '044-45928490',
    address: 'No.1 Ramachandra Nagar, Porur, Chennai',
    beds: 600, trauma: true, icu: true, open24x7: true,
    rating: 4.5,
  },
  {
    id: 'che-h-004', type: FACILITY_TYPES.HOSPITAL,
    name: 'MIOT International Hospital', shortName: 'MIOT',
    lat: 13.0170, lng: 80.1863,
    phone: '044-42002288', emergency: '044-42002288',
    address: '4/112, Mount Poonamalle Road, Manapakkam, Chennai',
    beds: 1000, trauma: true, icu: true, open24x7: true,
    rating: 4.4,
  },
  {
    id: 'che-h-005', type: FACILITY_TYPES.HOSPITAL,
    name: 'Fortis Malar Hospital', shortName: 'Fortis Malar',
    lat: 13.0110, lng: 80.2595,
    phone: '044-42897777', emergency: '044-42897777',
    address: '52 1st Main Rd, Gandhi Nagar, Adyar, Chennai',
    beds: 180, trauma: false, icu: true, open24x7: true,
    rating: 4.3,
  },
  {
    id: 'che-t-001', type: FACILITY_TYPES.TRAUMA,
    name: 'Rajiv Gandhi Govt General Hospital Trauma', shortName: 'RGGGH Trauma',
    lat: 13.0777, lng: 80.2800,
    phone: '044-25305555', emergency: '104',
    address: 'Park Town, Chennai',
    beds: 100, trauma: true, icu: true, open24x7: true,
    rating: 4.1,
  },
  {
    id: 'che-p-001', type: FACILITY_TYPES.POLICE,
    name: 'Chennai Police Control Room', shortName: 'CP Control',
    lat: 13.0827, lng: 80.2707,
    phone: '100', emergency: '100',
    address: 'Vepery, Chennai',
    open24x7: true,
  },
  {
    id: 'che-p-002', type: FACILITY_TYPES.POLICE,
    name: 'Adyar Police Station', shortName: 'Adyar PS',
    lat: 13.0067, lng: 80.2572,
    phone: '044-24420045', emergency: '100',
    address: 'Lattice Bridge Rd, Adyar, Chennai',
    open24x7: true,
  },
  {
    id: 'che-p-003', type: FACILITY_TYPES.POLICE,
    name: 'IIT Madras Gate Police Post', shortName: 'IITM Police',
    lat: 12.9916, lng: 80.2337,
    phone: '044-22578299', emergency: '100',
    address: 'IIT Madras Campus, Sardar Patel Rd, Chennai',
    open24x7: true,
  },
  {
    id: 'che-p-004', type: FACILITY_TYPES.POLICE,
    name: 'Velachery Police Station', shortName: 'Velachery PS',
    lat: 12.9815, lng: 80.2179,
    phone: '044-22443000', emergency: '100',
    address: 'Velachery Main Road, Chennai',
    open24x7: true,
  },

  /* ═══════════════════════════════════
     DELHI REGION
  ═══════════════════════════════════ */
  {
    id: 'del-h-001', type: FACILITY_TYPES.HOSPITAL,
    name: 'AIIMS New Delhi', shortName: 'AIIMS',
    lat: 28.5672, lng: 77.2100,
    phone: '011-26588500', emergency: '011-26588700',
    address: 'Sri Aurobindo Marg, Ansari Nagar, New Delhi',
    beds: 2478, trauma: true, icu: true, open24x7: true,
    rating: 4.8,
  },
  {
    id: 'del-h-002', type: FACILITY_TYPES.HOSPITAL,
    name: 'Safdarjung Hospital', shortName: 'Safdarjung',
    lat: 28.5687, lng: 77.2009,
    phone: '011-26707444', emergency: '011-26707444',
    address: 'Sri Aurobindo Marg, New Delhi',
    beds: 1531, trauma: true, icu: true, open24x7: true,
    rating: 3.9,
  },
  {
    id: 'del-h-003', type: FACILITY_TYPES.HOSPITAL,
    name: 'Max Super Specialty Saket', shortName: 'Max Saket',
    lat: 28.5244, lng: 77.2065,
    phone: '011-26515050', emergency: '1800-200-4000',
    address: '1 Press Enclave Road, Saket, New Delhi',
    beds: 500, trauma: true, icu: true, open24x7: true,
    rating: 4.5,
  },
  {
    id: 'del-t-001', type: FACILITY_TYPES.TRAUMA,
    name: 'AIIMS Trauma Centre', shortName: 'AIIMS Trauma',
    lat: 28.5680, lng: 77.2120,
    phone: '011-26588700', emergency: '011-26588700',
    address: 'Ring Road, Ansari Nagar, New Delhi',
    beds: 150, trauma: true, icu: true, open24x7: true,
    rating: 4.7,
  },
  {
    id: 'del-p-001', type: FACILITY_TYPES.POLICE,
    name: 'Delhi Police Control Room', shortName: 'Delhi Police CR',
    lat: 28.6452, lng: 77.2246,
    phone: '100', emergency: '100',
    address: 'Jai Singh Road, New Delhi',
    open24x7: true,
  },

  /* ═══════════════════════════════════
     BENGALURU REGION
  ═══════════════════════════════════ */
  {
    id: 'blr-h-001', type: FACILITY_TYPES.HOSPITAL,
    name: 'Victoria Hospital', shortName: 'Victoria',
    lat: 12.9726, lng: 77.5728,
    phone: '080-26706000', emergency: '080-26706000',
    address: 'Fort Road, Bengaluru',
    beds: 1270, trauma: true, icu: true, open24x7: true,
    rating: 3.8,
  },
  {
    id: 'blr-h-002', type: FACILITY_TYPES.HOSPITAL,
    name: 'Manipal Hospital Old Airport Road', shortName: 'Manipal HAL',
    lat: 12.9634, lng: 77.6491,
    phone: '080-25024444', emergency: '080-25024444',
    address: '98, HAL Airport Road, Bengaluru',
    beds: 600, trauma: true, icu: true, open24x7: true,
    rating: 4.6,
  },
  {
    id: 'blr-h-003', type: FACILITY_TYPES.HOSPITAL,
    name: 'Narayana Health City', shortName: 'Narayana HC',
    lat: 12.8944, lng: 77.6118,
    phone: '080-71222222', emergency: '080-71222222',
    address: '258/A, Bommasandra Industrial Area, Bengaluru',
    beds: 2000, trauma: true, icu: true, open24x7: true,
    rating: 4.5,
  },
  {
    id: 'blr-t-001', type: FACILITY_TYPES.TRAUMA,
    name: 'NIMHANS Trauma Centre', shortName: 'NIMHANS Trauma',
    lat: 12.9369, lng: 77.5954,
    phone: '080-46110007', emergency: '080-46110007',
    address: 'Hosur Road, Bengaluru',
    beds: 60, trauma: true, icu: true, open24x7: true,
    rating: 4.4,
  },
  {
    id: 'blr-p-001', type: FACILITY_TYPES.POLICE,
    name: 'Bengaluru City Police Control', shortName: 'BCP Control',
    lat: 12.9804, lng: 77.5888,
    phone: '100', emergency: '100',
    address: 'Infantry Road, Bengaluru',
    open24x7: true,
  },

  /* ═══════════════════════════════════
     HYDERABAD REGION
  ═══════════════════════════════════ */
  {
    id: 'hyd-h-001', type: FACILITY_TYPES.HOSPITAL,
    name: 'Osmania General Hospital', shortName: 'Osmania GH',
    lat: 17.3859, lng: 78.4718,
    phone: '040-24600100', emergency: '040-24600100',
    address: 'Afzal Gunj, Hyderabad',
    beds: 1200, trauma: true, icu: true, open24x7: true,
    rating: 3.9,
  },
  {
    id: 'hyd-h-002', type: FACILITY_TYPES.HOSPITAL,
    name: 'Apollo Hospitals Jubilee Hills', shortName: 'Apollo Hyd',
    lat: 17.4267, lng: 78.4142,
    phone: '040-23607777', emergency: '040-23607777',
    address: 'Film Nagar, Jubilee Hills, Hyderabad',
    beds: 450, trauma: true, icu: true, open24x7: true,
    rating: 4.6,
  },
  {
    id: 'hyd-p-001', type: FACILITY_TYPES.POLICE,
    name: 'Hyderabad Police Control Room', shortName: 'HCP Control',
    lat: 17.3857, lng: 78.4755,
    phone: '100', emergency: '100',
    address: 'Purani Haveli, Hyderabad',
    open24x7: true,
  },
];

/** National Emergency Numbers */
export const EMERGENCY_NUMBERS = {
  POLICE: '100',
  FIRE: '101',
  AMBULANCE: '108',
  DISASTER: '112',
  WOMEN_HELPLINE: '1091',
  CHILD_HELPLINE: '1098',
  ACCIDENT_RELIEF: '1073',
};