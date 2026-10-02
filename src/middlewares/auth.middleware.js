import jwt from 'jsonwebtoken'

// Verificar que la petición incluya un Token válido
export const verifyToken = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ message: 'Acceso denegado. Se requiere un token válido.' })
    }

    const token = authHeader.split(' ')[1]
    const decoded = jwt.verify(token, process.env.JWT_SECRET)

    req.user = decoded // Guardamos los datos del usuario decodificado (id, role)
    next()
  } catch (error) {
    return res.status(403).json({ message: 'Token inválido o expirado' })
  }
}

// Verificar si el rol del usuario está permitido para la ruta
export const checkRole = (allowedRoles) => {
  return (req, res, next) => {
    if (!req.user || !allowedRoles.includes(req.user.role)) {
      return res.status(403).json({ 
        message: `Acceso denegado. Permisos insuficientes para tu rol (${req.user?.role}).` 
      })
    }
    next()
  }
}