module.exports = {
  tenants: [
    {
      name: 'template',
      domains: [
        {
          development: 'lover.escale.br',// /dev\.[a-z]*\.local\.website-1\.com/ // Regex supported!
          stage: 'stage.website-1.com',
          production: 'website-1.com',
        },
      ],
    },
    {
      name: 'template',
      domains: [
        {
          development: 'hater.escale.com',
          stage: 'stage.website-2.com',
          production: /[\w|\d|-|_]+\.website-2.com/, // Regex supported!
        },
      ],
    },
    {
      name: 'template',
      domains: [
        {
          development: 'hackathon.escale.com',
          stage: 'stage.website-2.com',
          production: /[\w|\d|-|_]+\.website-2.com/, // Regex supported!
        },
      ],
    },
  ],
};