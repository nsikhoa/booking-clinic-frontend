export const adminMenu = [
  {
    //Người dùng
    name: "menu.admin.manage-user",
    menus: [
      {
        name: "menu.admin.crud",
        link: "/system/user-manage",
      },
      {
        name: "menu.admin.manage-doctor",
        link: "/system/doctor-manage",
        // subMenus: [
        //   {
        //     name: "menu.admin.manage-doctor",
        //     link: "/system/user-manage",
        //   },
        //   {
        //     name: "menu.system.system-administrator.product-manage",
        //     link: "/system/product-manage",
        //   },
        // ],
      },
      // {
      //   name: "menu.admin.manage-admin",
      //   link: "/system/user-admin",
      // },
      {
        // Lịch khám
        name: "menu.doctor.manage-schedule",
        link: "/doctor/manage-schedule",
      },
    ],
  },
  {
    //Phòng khám
    name: "menu.admin.clinic",
    menus: [
      {
        name: "menu.admin.manage-clinic",
        link: "/system/clinic-manage",
      },
    ],
  },
  {
    //Chuyên khoa
    name: "menu.admin.specialty",
    menus: [
      {
        name: "menu.admin.manage-specialty",
        link: "/system/user-specialty",
      },
    ],
  },
  // {
  //   //Phòng khám
  //   name: "menu.admin.handbook",
  //   menus: [
  //     {
  //       name: "menu.admin.manage-handbook",
  //       link: "/system/user-handbook",
  //     },
  //   ],
  // },
];

export const doctorMenu = [
  {
    name: "menu.admin.manage-user",
    menus: [
      {
        name: "menu.doctor.manage-schedule",
        link: "/doctor/manage-schedule",
      },
      {
        name: "menu.doctor.manage-schedule-patient",
        link: "/doctor/manage-schedule-patient",
      },
    ],
  },
];

export const patientMenu = [
  {
    name: "menu.patient.patient-history",
    menus: [],
  },
];
