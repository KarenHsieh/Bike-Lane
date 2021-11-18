const axios = require('axios')
const { axiosCall, formatDate } = require('../tools')

const apiBaseUri = 'https://ptx.transportdata.tw/MOTC/v2/'
const uri = {
  scenicSpot: `${apiBaseUri}Tourism/ScenicSpot`,
  restaurant: `${apiBaseUri}Tourism/Restaurant`,
  hotel: `${apiBaseUri}Tourism/Hotel`,
  activity: `${apiBaseUri}Tourism/Activity`,
}

exports.getScenicSpotList = async (ctx, next) => {
  ctx.status = 200
  const { city = '', keyword = '', category = '' } = ctx.request.query
  const options = {
    method: 'GET',
    url: `${uri.scenicSpot}${
      city ? `/${city}/` : ''
    }?$filter=not(Class1 eq null) AND not(Picture eq null) AND not(City eq null)${
      keyword
        ? ` AND (contains(Name, '${keyword}') OR contains(Keyword, '${keyword}'))${
            category ? ` AND Class1 eq ${category}` : ''
          }`
        : ''
    }&$orderby=UpdateTime desc&$format=JSON${!city && !keyword ? '&$top=200' : ''}`,
  }

  //console.log('getScenicSpotList = ' + options.url)

  try {
    const response = await axiosCall(options)
    if (response) {
      const { status, data } = response
      if (status === 200) {
        ctx.response.body = {
          status: 200,
          result: data,
          dataCount: data.length || 0,
        }
      } else {
        ctx.response.body = {
          status: 404,
        }
      }
    } else {
      ctx.response.body = {
        status: 404,
      }
    }
  } catch (error) {
    console.error(`network fetch error - ${options.url} - ${error.message}`)
  }
}

exports.getRestaurantList = async (ctx, next) => {
  ctx.status = 200
  const { city = '', keyword = '', category = '' } = ctx.request.query
  const options = {
    method: 'GET',
    url: `${uri.restaurant}${
      city ? `/${city}/` : ''
    }?$filter=not(Class eq null) AND not(Picture eq null) AND not(City eq null)${
      keyword ? ` AND contains(Name, '${keyword}')${category ? ` AND Class eq ${category}` : ''}` : ''
    }&$orderby=UpdateTime desc&$format=JSON${!city && !keyword ? '&$top=200' : ''}`,
  }

  console.log('getRestaurantList = ' + options.url)

  try {
    const response = await axiosCall(options)
    if (response) {
      const { status, data } = response
      if (status === 200) {
        ctx.response.body = {
          status: 200,
          result: data,
          dataCount: data.length || 0,
        }
      } else {
        ctx.response.body = {
          status: 404,
        }
      }
    } else {
      ctx.response.body = {
        status: 404,
      }
    }
  } catch (error) {
    console.error(`network fetch error - ${options.url} - ${error.message}`)
  }
}

exports.getHotelList = async (ctx, next) => {
  ctx.status = 200
  const { city = '', keyword = '', category = '' } = ctx.request.query
  const options = {
    method: 'GET',
    url: `${uri.hotel}${city ? `/${city}/` : ''}?$filter=date(StartTime) ge ${formatDate(new Date())}${
      keyword ? ` AND contains(Name, '${keyword}')${category ? ` AND Class1 eq ${category}` : ''}` : ''
    }&$orderby=StartTime asc&$format=JSON${!city && !keyword ? '&$top=200' : ''}`,
  }

  console.log('getHotelList = ' + options.url)

  try {
    const { data } = await axiosCall(options)

    ctx.response.body = {
      status: 200,
      result: data,
      dataCount: data.length || 0,
    }
  } catch (error) {
    console.error(`network fetch error - ${options.url} - ${error.message}`)
  }
}

exports.getActivityList = async (ctx, next) => {
  ctx.status = 200
  const { city = '', keyword = '', category = '' } = ctx.request.query
  const options = {
    method: 'GET',
    url: `${uri.activity}${
      city ? `/${city}/` : ''
    }?$filter=not(Class1 eq null) AND not(Picture eq null) AND not(City eq null) AND date(StartTime) ge ${formatDate(
      new Date()
    )}&${
      keyword ? `contains(Name, '${keyword}')${category ? ` AND Class1 eq ${category}` : ''}` : ''
    }&$orderby=StartTime asc&$format=JSON${!city && !keyword ? '&$top=200' : ''}`,
  }

  console.log('getActivityList = ' + options.url)

  try {
    const response = await axiosCall(options)
    if (response) {
      const { status, data } = response
      if (status === 200) {
        ctx.response.body = {
          status: 200,
          result: data,
          dataCount: data.length || 0,
        }
      } else {
        ctx.response.body = {
          status: 404,
        }
      }
    } else {
      ctx.response.body = {
        status: 404,
      }
    }
  } catch (error) {
    console.error(`network fetch error - ${options.url} - ${error.message}`)
  }
}
