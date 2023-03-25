export default [
  {
    id: 0,
    heading: 'Personal info',
    text: 'Please provide your name, email address and phone number',
    name: '',
    email: '',
    phone: '',
  },
  {
    id: 1,
    heading: 'Select your plan',
    offer: '2 months free',
    activePlan: null,
    plans: [
      {
        planId: 1,
        icon: 'icon-arcade.svg',
        title: 'Arcade',
        price: {
          month: 9,
          year: 90,
        },
      },
      {
        planId: 2,
        icon: 'icon-advanced.svg',
        title: 'Advanced',
        price: {
          month: 12,
          year: 120,
        },
      },
      {
        planId: 3,
        icon: 'icon-pro.svg',
        title: 'Pro',
        price: {
          month: 15,
          year: 150,
        },
      },
    ],
  },
  {
    id: 2,
    heading: 'Pick add-ons',
    text: 'Add-ons help enhance your gaming experience',
    plans: [
      {
        planId: 1,
        title: 'Online service',
        description: 'Access to multiplayer games',
        price: {
          month: 1,
          year: 10,
        },
        checked: false,
      },
      {
        planId: 2,
        title: 'Larger storage',
        description: 'Extra 1TB of cloud save',
        price: {
          month: 2,
          year: 20,
        },
        checked: false,
      },
      {
        planId: 3,
        title: 'Customizable profile',
        description: 'Custom theme on your profile',
        price: {
          month: 2,
          year: 20,
        },
        checked: false,
      },
    ],
  },
  {
    id: 3,
    heading: 'Finishing up',
    text: 'Double-check everything looks OK before confirming',
  },
]