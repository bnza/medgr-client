import type { StaticResourceConfig } from '~~/types/api'

export default {
  appPath: '/data/micro-stratigraphic-units',
  labels: ['Microstratigraphic Unit', 'Microstratigraphic Units'],
  defaultHeaders: [
    {
      key: 'id',
      value: 'id',
      title: 'ID',
      align: 'center',
      width: '200',
      maxWidth: '200',
    },
    {
      key: 'code',
      value: 'code',
      title: 'code',
      width: '200',
      sortable: false,
    },
    {
      key: 'stratigraphicUnit.site.code',
      value: 'stratigraphicUnit.site.code',
      title: 'site',
      width: '80',
    },
    {
      key: 'stratigraphicUnit.year',
      value: 'stratigraphicUnit.year',
      title: 'year',
      width: '80',
    },
    {
      key: 'number',
      value: 'number',
      title: 'number',
    },
    {
      key: 'interpretation',
      value: 'interpretation',
      title: 'interpretation',
      sortable: false,
      minWidth: 200,
      width: 200,
    },
    {
      key: 'depositType',
      value: 'depositType',
      title: 'deposit type',
      minWidth: 150,
      width: 150,
      sortable: false,
      align: 'center',
    },
    {
      key: 'keyAttributes',
      value: 'keyAttributes',
      title: 'key attributes',
      minWidth: 150,
      width: 150,
    },
    {
      key: 'inclusionsGeology',
      value: 'inclusionsGeology',
      title: 'geology (% inc.)',
      width: '60',
      align: 'center',
    },
    {
      key: 'inclusionsBuildingMaterials',
      value: 'inclusionsBuildingMaterials',
      title: 'building mats. (% inc.)',
      width: '60',
      align: 'center',
    },
    {
      key: 'inclusionsDomesticRefuse',
      value: 'inclusionsDomesticRefuse',
      title: 'domestic refuse (% inc.)',
      width: '60',
      align: 'center',
    },
    {
      key: 'inclusionsOrganicRefuse',
      value: 'inclusionsOrganicRefuse',
      title: 'organic refuse (% inc.)',
      width: '60',
      align: 'center',
    },
    {
      key: 'colourPpl',
      value: 'colourPpl',
      title: 'PPL colour',
      width: '60',
      sortable: false,
    },
    {
      key: 'colourXpl',
      value: 'colourXpl',
      title: 'XPL colour',
      width: '60',
      sortable: false,
    },
    {
      key: 'colourOil',
      value: 'colourOil',
      title: 'OIL colour',
      width: '60',
      sortable: false,
    },
    {
      key: 'lenticularPlateyPeds',
      value: 'lenticularPlateyPeds',
      title: 'lenticular platey peds',
      width: '60',
      align: 'center',
      sortable: false,
    },
    {
      key: 'crumbsOrGranules',
      value: 'crumbsOrGranules',
      title: 'crumbs or granules',
      width: '60',
      align: 'center',
      sortable: false,
    },
    {
      key: 'saBlockyPeds',
      value: 'saBlockyPeds',
      title: 'SA blocky peds',
      width: '60',
      align: 'center',
      sortable: false,
    },
    {
      key: 'cracks',
      value: 'cracks',
      title: 'cracks',
      width: '60',
      align: 'center',
      sortable: false,
    },
    {
      key: 'infillings',
      value: 'infillings',
      title: 'infilligs',
      width: '60',
      align: 'center',
      sortable: false,
    },
    {
      key: 'mesofaunaRootBioturbation',
      value: 'mesofaunaRootBioturbation',
      title: 'mesofauna root bioturbation',
      width: '60',
      align: 'center',
    },
    {
      key: 'earthwormInternalChamber',
      value: 'earthwormInternalChamber',
      title: 'earthworm internal chamber',
      width: '60',
      align: 'center',
    },
    {
      key: 'organicOrganoMineral',
      value: 'organicOrganoMineral',
      title: 'organic organo mineral',
      width: '60',
      align: 'center',
    },
    {
      key: 'earthwormGranule',
      value: 'earthwormGranule',
      title: 'earthworm granule',
      width: '60',
      align: 'center',
    },
  ],
} as Readonly<StaticResourceConfig>
