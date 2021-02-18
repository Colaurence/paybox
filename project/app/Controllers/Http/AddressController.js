'use strict'

var Philippines = require('phil-reg-prov-mun-brgy');
const RegionTransformer = use('App/Transformers/RegionTransformer')
const RegionProvinceTransformer = use('App/Transformers/RegionProvinceTransformer')
const ProvinceMunicipalityTransformer = use('App/Transformers/ProvinceMunicipalityTransformer')
const MunicipalityBaranggayTransformer = use('App/Transformers/MunicipalityBaranggayTransformer')

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with profilepartners
 */
class AddressController {

  async regions ({transform }) {
      const results = await Philippines.regions
      return await transform.collection(Philippines.sort(results, 'A'), RegionTransformer)
  }

  async regionProvinces ({ params, transform }) {
    const results = await Philippines.getProvincesByRegion(params.regionCode)
    return await transform.collection(Philippines.sort(results, 'A'), RegionProvinceTransformer)
 }

  async provinceMunicipalities ({ params, transform }) {
   const results = await Philippines.getCityMunByProvince(params.provinceCode)
   return await transform.collection(Philippines.sort(results, 'A'), ProvinceMunicipalityTransformer)
  }

  async municipalityBaranggays ({ params, transform }) {
    const results = await Philippines.getBarangayByMun(params.municipalityCode)
    return await transform.collection(Philippines.sort(results, 'A'), MunicipalityBaranggayTransformer)
   }

}

module.exports = AddressController
