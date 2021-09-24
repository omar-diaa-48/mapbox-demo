import API from './axios'

export async function getBranches() {
  const response = await API.get('/branches')
  const {data} = response.data
  return data
}

// const coordinates = [[31.23479,30.0487], [31.2406,30.0507], [31.2420,30.0462], [31.2373,30.0457]]
// export const branches = [{
//   id:1,
//   name:"Downtown",
//   coordinates:[[30.048851, 31.242317], [30.04755, 31.238648], [30.046083, 31.242102]]
// },{
//   id:2,
//   name:"Haram",
//   coordinates:[[30.044467, 31.241909], [30.044021, 31.243948], [30.041068, 31.243862], [30.041235, 31.240987]]
// }]

export const branches = [
  {
    id:1,
    name:"Sheraton",
    coordinates:[[30.092564, 31.372318],[30.096054, 31.38206],[30.101883, 31.381459],[30.110051, 31.370645],[30.10567, 31.362448],[30.097613, 31.371632]]
  }
]