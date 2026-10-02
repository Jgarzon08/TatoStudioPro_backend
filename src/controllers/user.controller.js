import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import User from '../models/user.models.js'

// 1. CREATE - Register (Ya lo tenemos)
export const registerUser = async (req, res) => {
  try {
    const { name, email, password, role } = req.body

    if (!name || !email || !password) {
      return res.status(400).json({ message: 'Todos los campos son obligatorios' })
    }

    const userExists = await User.findOne({ email })
    if (userExists) {
      return res.status(400).json({ message: 'El correo electrónico ya está registrado' })
    }

    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      role: role || 'user'
    })

    await newUser.save()

    res.status(201).json({
      message: 'Usuario registrado exitosamente',
      user: { id: newUser._id, name: newUser.name, email: newUser.email, role: newUser.role }
    })
  } catch (error) {
    res.status(500).json({ message: 'Error al registrar el usuario', error: error.message })
  }
}

// 2. LOGIN (Ya lo tenemos)
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body

    if (!email || !password) {
      return res.status(400).json({ message: 'Por favor ingresa correo y contraseña' })
    }

    const user = await User.findOne({ email })
    if (!user) {
      return res.status(401).json({ message: 'Credenciales inválidas' })
    }

    const isPasswordValid = await bcrypt.compare(password, user.password)
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Credenciales inválidas' })
    }

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '8h' }
    )

    res.status(200).json({
      message: 'Inicio de sesión exitoso',
      token,
      user: { id: user._id, name: user.name, email: user.email, role: user.role }
    })
  } catch (error) {
    res.status(500).json({ message: 'Error en el inicio de sesión', error: error.message })
  }
}

// 3. READ - Obtener todos los usuarios (G)
export const getUsers = async (req, res) => {
  try {
    // Excluimos la contraseña de la respuesta por seguridad (.select('-password'))
    const users = await User.find().select('-password').sort({ createdAt: -1 })
    res.status(200).json(users)
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener usuarios', error: error.message })
  }
}

// 4. READ - Obtener un usuario por ID (G)
export const getUserById = async (req, res) => {
  try {
    const { id } = req.params
    const user = await User.findById(id).select('-password')

    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado' })
    }

    res.status(200).json(user)
  } catch (error) {
    res.status(500).json({ message: 'Error al buscar el usuario', error: error.message })
  }
}

// 5. UPDATE - Actualizar información del usuario (P)
export const updateUser = async (req, res) => {
  try {
    const { id } = req.params
    const { name, email, role, password } = req.body

    const updateData = { name, email, role }

    // Si envían una nueva contraseña, la encriptamos antes de actualizar
    if (password) {
      const salt = await bcrypt.genSalt(10)
      updateData.password = await bcrypt.hash(password, salt)
    }

    const updatedUser = await User.findByIdAndUpdate(id, updateData, { new: true }).select('-password')

    if (!updatedUser) {
      return res.status(404).json({ message: 'Usuario no encontrado' })
    }

    res.status(200).json({ message: 'Usuario actualizado con éxito', user: updatedUser })
  } catch (error) {
    res.status(500).json({ message: 'Error al actualizar el usuario', error: error.message })
  }
}

// 6. DELETE - Eliminar un usuario (D)
export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params
    const deletedUser = await User.findByIdAndDelete(id)

    if (!deletedUser) {
      return res.status(404).json({ message: 'Usuario no encontrado' })
    }

    res.status(200).json({ message: 'Usuario eliminado correctamente' })
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar el usuario', error: error.message })
  }
}