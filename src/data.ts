export const dataOne = {
  id: 0,
  heading: 'Personal info',
  text: 'Please provide your name, email address and phone number',
  inputs: [
    {
      name: 'name',
      placeholder: 'e.g. Stephen King',
      type: 'text',
      label: 'Name',
    },
    {
      name: 'email',
      placeholder: 'e.g. stephenking@lorem.com',
      type: 'email',
      label: 'Email Address',
    },
    {
      name: 'phone',
      placeholder: 'e.g. +1 234 567 890',
      type: 'number',
      label: 'Phone number',
    },
  ],
}
export const dataTwo = {
  id: 1,
  heading: 'Select your plan',
  text: 'You have the option of monthly or yearly billing.',
  offer: '2 months free',
  plans: [
    {
      planId: 1,
      title: 'Arcade',
      price: {
        month: 9,
        year: 90,
      },
    },
    {
      planId: 2,
      title: 'Advanced',
      price: {
        month: 12,
        year: 120,
      },
    },
    {
      planId: 3,
      title: 'Pro',
      price: {
        month: 15,
        year: 150,
      },
    },
  ],
}

export const dataThree = {
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
    },
    {
      planId: 2,
      title: 'Larger storage',
      description: 'Extra 1TB of cloud save',
      price: {
        month: 2,
        year: 20,
      },
    },
    {
      planId: 3,
      title: 'Customizable profile',
      description: 'Custom theme on your profile',
      price: {
        month: 2,
        year: 20,
      },
    },
  ],
}

export const dataFour = {
  id: 3,
  heading: 'Finishing up',
  text: 'Double-check everything looks OK before confirming',
}
