module.exports = {
  tenants: [
    {
      name: 'website-1',
      domains: [
        {
          development: /local\.[a-z]*-1\.com/,// /dev\.[a-z]*\.local\.website-1\.com/ // Regex supported!
          stage: 'stage.website-1.com',
          production: 'website-1.com',
        },
      ],
    },
    {
      name: 'website-2',
      domains: [
        {
          development: 'local.website-2.com',
          stage: 'stage.website-2.com',
          production: /[\w|\d|-|_]+\.website-2.com/, // Regex supported!
        },
      ],
    },
  ],
};