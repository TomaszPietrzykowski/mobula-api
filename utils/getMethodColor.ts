const getMethodColor = (method) => {
  switch (method) {
    case 'GET':
      return { color: '#00ff00' }
    case 'POST':
      return { color: '#0000ff' }
    case 'PUT':
      return { color: '#888800' }
    case 'PATCH':
      return { color: '#00ff00' }
    case 'DELETE':
      return { color: '#ff0000' }
    case 'HEAD':
      return { color: '#999900' }
    case 'OPTIONS':
      return { color: '#003333' }

    default:
      return {}
  }
}

export default getMethodColor
