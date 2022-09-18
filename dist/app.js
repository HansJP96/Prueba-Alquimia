/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/controller/auth/LoginUser.js":
/*!******************************************!*\
  !*** ./src/controller/auth/LoginUser.js ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "logInUser": () => (/* binding */ logInUser)
/* harmony export */ });
/* harmony import */ var _prisma_client__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @prisma/client */ "@prisma/client");
/* harmony import */ var _prisma_client__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_prisma_client__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _utils_errors_ResponseError__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../utils/errors/ResponseError */ "./src/utils/errors/ResponseError.js");
/* harmony import */ var _utils_helpers_auth_AuthFunctions__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../utils/helpers/auth/AuthFunctions */ "./src/utils/helpers/auth/AuthFunctions.js");



const prisma = new _prisma_client__WEBPACK_IMPORTED_MODULE_0__.PrismaClient();
const logInUser = async (req, res) => {
  let getUser = null;
  const email = req.body.email;
  const password = req.body.contrasena;

  try {
    getUser = await prisma.$transaction(async table => {
      const passwordItems = await table.usuario.findUnique({
        where: {
          email: email
        },
        select: {
          contrasena: true,
          salt_usuario: true
        }
      });
      const decodedPassword = (0,_utils_helpers_auth_AuthFunctions__WEBPACK_IMPORTED_MODULE_2__.decrypter)(passwordItems.contrasena, passwordItems.salt_usuario);

      if (password !== decodedPassword) {
        throw new Error("Cod-001");
      }

      const userData = await prisma.usuario.findUnique({
        where: {
          email: email
        },
        select: {
          email: true,
          primer_nombre: true,
          primer_apellido: true
        }
      });
      return userData;
    });
  } catch (error) {
    return res.status(401).send((0,_utils_errors_ResponseError__WEBPACK_IMPORTED_MODULE_1__.responseError)("Error validando credenciales de usuario", error));
  }

  const genToken = await (0,_utils_helpers_auth_AuthFunctions__WEBPACK_IMPORTED_MODULE_2__.generateToken)(getUser);
  return res.status(200).send({
    token: genToken
  });
};

/***/ }),

/***/ "./src/controller/auth/RegisterUser.js":
/*!*********************************************!*\
  !*** ./src/controller/auth/RegisterUser.js ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "registerNewUser": () => (/* binding */ registerNewUser)
/* harmony export */ });
/* harmony import */ var _prisma_client__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @prisma/client */ "@prisma/client");
/* harmony import */ var _prisma_client__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_prisma_client__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _utils_errors_ResponseError__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../utils/errors/ResponseError */ "./src/utils/errors/ResponseError.js");
/* harmony import */ var _utils_helpers_auth_AuthFunctions__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../utils/helpers/auth/AuthFunctions */ "./src/utils/helpers/auth/AuthFunctions.js");
/* harmony import */ var _utils_helpers_auth_EmailSender__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../utils/helpers/auth/EmailSender */ "./src/utils/helpers/auth/EmailSender.js");
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }




const prisma = new _prisma_client__WEBPACK_IMPORTED_MODULE_0__.PrismaClient();
const registerNewUser = async (req, res) => {
  let newUser = null;
  const email = req.body.email;
  const password = req.body.contrasena;
  const salt = (0,_utils_helpers_auth_AuthFunctions__WEBPACK_IMPORTED_MODULE_2__.saltStructure)();

  try {
    newUser = await prisma.usuario.create({
      data: _objectSpread(_objectSpread({}, req.body), {}, {
        email: email,
        contrasena: (0,_utils_helpers_auth_AuthFunctions__WEBPACK_IMPORTED_MODULE_2__.encrypter)(password, salt),
        salt_usuario: salt
      }),
      select: {
        email: true,
        primer_nombre: true,
        primer_apellido: true
      }
    });
  } catch (error) {
    return res.status(500).send((0,_utils_errors_ResponseError__WEBPACK_IMPORTED_MODULE_1__.responseError)("Error al registrar al usuario", error));
  }

  const genToken = await (0,_utils_helpers_auth_AuthFunctions__WEBPACK_IMPORTED_MODULE_2__.generateToken)(newUser);
  return (0,_utils_helpers_auth_EmailSender__WEBPACK_IMPORTED_MODULE_3__.sendEmail)(newUser, genToken, res);
};

/***/ }),

/***/ "./src/controller/characters/CreateCharacters.js":
/*!*******************************************************!*\
  !*** ./src/controller/characters/CreateCharacters.js ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "createNewCharacter": () => (/* binding */ createNewCharacter)
/* harmony export */ });
/* harmony import */ var _prisma_client__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @prisma/client */ "@prisma/client");
/* harmony import */ var _prisma_client__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_prisma_client__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _utils_helpers_common_ConnectSchema__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../utils/helpers/common/ConnectSchema */ "./src/utils/helpers/common/ConnectSchema.js");
/* harmony import */ var _utils_errors_ResponseError__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../utils/errors/ResponseError */ "./src/utils/errors/ResponseError.js");
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }




const prisma = new _prisma_client__WEBPACK_IMPORTED_MODULE_0__.PrismaClient();
const createNewCharacter = async (req, res) => {
  let newCharacter = null;
  const movies = req.body.peliculas;

  try {
    newCharacter = await prisma.personaje.create({
      data: _objectSpread(_objectSpread({}, req.body), {}, {
        peliculas: {
          create: (0,_utils_helpers_common_ConnectSchema__WEBPACK_IMPORTED_MODULE_1__.createConnectFormat)(movies, "pelicula", "id")
        }
      }),
      include: {
        peliculas: {
          select: {
            pelicula: true
          }
        }
      }
    });
  } catch (error) {
    return res.status(400).send((0,_utils_errors_ResponseError__WEBPACK_IMPORTED_MODULE_2__.responseError)("Error creando personaje", error));
  }

  return res.status(201).send(newCharacter);
};

/***/ }),

/***/ "./src/controller/characters/DeleteCharacters.js":
/*!*******************************************************!*\
  !*** ./src/controller/characters/DeleteCharacters.js ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "deleteOneCharacter": () => (/* binding */ deleteOneCharacter)
/* harmony export */ });
/* harmony import */ var _prisma_client__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @prisma/client */ "@prisma/client");
/* harmony import */ var _prisma_client__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_prisma_client__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _utils_errors_ResponseError__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../utils/errors/ResponseError */ "./src/utils/errors/ResponseError.js");


const prisma = new _prisma_client__WEBPACK_IMPORTED_MODULE_0__.PrismaClient();
const deleteOneCharacter = async (req, res) => {
  const paramId = parseInt(req.params.id);

  try {
    await prisma.personaje.delete({
      where: {
        id: paramId
      }
    });
  } catch (error) {
    return res.status(500).send((0,_utils_errors_ResponseError__WEBPACK_IMPORTED_MODULE_1__.responseError)(`Error eliminando personaje con id=${paramId}`, error));
  }

  return res.status(200).send(`El personaje con id=${paramId} ha sido eliminado`);
};

/***/ }),

/***/ "./src/controller/characters/GetCharacters.js":
/*!****************************************************!*\
  !*** ./src/controller/characters/GetCharacters.js ***!
  \****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "getCharacterList": () => (/* binding */ getCharacterList),
/* harmony export */   "getOneCharacter": () => (/* binding */ getOneCharacter)
/* harmony export */ });
/* harmony import */ var _prisma_client__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @prisma/client */ "@prisma/client");
/* harmony import */ var _prisma_client__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_prisma_client__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _utils_errors_ResponseError__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../utils/errors/ResponseError */ "./src/utils/errors/ResponseError.js");


const prisma = new _prisma_client__WEBPACK_IMPORTED_MODULE_0__.PrismaClient();
const getCharacterList = async (req, res) => {
  let characters = null;
  const name = req.query.name;
  const age = parseInt(req.query.age) || undefined;
  const movies = req.query.movies?.split(",").map(idMovie => {
    return parseInt(idMovie);
  });

  try {
    characters = await prisma.personaje.findMany({
      where: {
        nombre: {
          contains: name
        },
        edad: {
          equals: age
        },
        peliculas: {
          some: {
            pelicula: {
              id: {
                in: movies
              }
            }
          }
        }
      },
      include: {
        peliculas: {
          select: {
            pelicula: true
          }
        }
      }
    });
  } catch (error) {
    return res.status(500).send((0,_utils_errors_ResponseError__WEBPACK_IMPORTED_MODULE_1__.responseError)("Error listando personajes", error));
  }

  return res.status(200).send(characters);
};
const getOneCharacter = async (req, res) => {
  let character = null;
  const paramId = parseInt(req.params.id);

  try {
    character = await prisma.personaje.findUnique({
      where: {
        id: paramId
      },
      include: {
        peliculas: {
          select: {
            pelicula: true
          }
        }
      }
    });
  } catch (error) {
    return res.status(500).send((0,_utils_errors_ResponseError__WEBPACK_IMPORTED_MODULE_1__.responseError)(`Error obteniendo personaje con id=${paramId}`, error));
  }

  return res.status(200).send(character);
};

/***/ }),

/***/ "./src/controller/characters/UpdateCharacters.js":
/*!*******************************************************!*\
  !*** ./src/controller/characters/UpdateCharacters.js ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "updateOneCharacter": () => (/* binding */ updateOneCharacter)
/* harmony export */ });
/* harmony import */ var _prisma_client__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @prisma/client */ "@prisma/client");
/* harmony import */ var _prisma_client__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_prisma_client__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _utils_helpers_common_ConnectSchema__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../utils/helpers/common/ConnectSchema */ "./src/utils/helpers/common/ConnectSchema.js");
/* harmony import */ var _utils_errors_ResponseError__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../utils/errors/ResponseError */ "./src/utils/errors/ResponseError.js");
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }




const prisma = new _prisma_client__WEBPACK_IMPORTED_MODULE_0__.PrismaClient();
const updateOneCharacter = async (req, res) => {
  let characterUpdated = null;
  const paramId = parseInt(req.params.id);
  const movies = req.body.peliculas;

  try {
    characterUpdated = await prisma.personaje.update({
      where: {
        id: paramId
      },
      data: _objectSpread(_objectSpread({}, req.body), {}, {
        peliculas: {
          create: (0,_utils_helpers_common_ConnectSchema__WEBPACK_IMPORTED_MODULE_1__.createConnectFormat)(movies?.conectar, "pelicula", "id"),
          deleteMany: (0,_utils_helpers_common_ConnectSchema__WEBPACK_IMPORTED_MODULE_1__.deleteRelationFormat)(movies?.desconectar, "idPelicula", {
            idPersonaje: paramId
          })
        }
      })
    });
  } catch (error) {
    return res.status(500).send((0,_utils_errors_ResponseError__WEBPACK_IMPORTED_MODULE_2__.responseError)(`Error actualizando personaje con id=${paramId}`, error));
  }

  return res.status(204).send();
};

/***/ }),

/***/ "./src/controller/genres/CreateGenres.js":
/*!***********************************************!*\
  !*** ./src/controller/genres/CreateGenres.js ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "createNewGenre": () => (/* binding */ createNewGenre)
/* harmony export */ });
/* harmony import */ var _prisma_client__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @prisma/client */ "@prisma/client");
/* harmony import */ var _prisma_client__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_prisma_client__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _utils_errors_ResponseError__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../utils/errors/ResponseError */ "./src/utils/errors/ResponseError.js");
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }



const prisma = new _prisma_client__WEBPACK_IMPORTED_MODULE_0__.PrismaClient();
const createNewGenre = async (req, res) => {
  let newGenre = null;

  try {
    newGenre = await prisma.genero.create({
      data: _objectSpread({}, req.body)
    });
  } catch (error) {
    return res.status(400).send((0,_utils_errors_ResponseError__WEBPACK_IMPORTED_MODULE_1__.responseError)("Error creando genero", error));
  }

  return res.status(201).send(newGenre);
};

/***/ }),

/***/ "./src/controller/genres/DeleteGenres.js":
/*!***********************************************!*\
  !*** ./src/controller/genres/DeleteGenres.js ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "deleteOneGenre": () => (/* binding */ deleteOneGenre)
/* harmony export */ });
/* harmony import */ var _prisma_client__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @prisma/client */ "@prisma/client");
/* harmony import */ var _prisma_client__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_prisma_client__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _utils_errors_ResponseError__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../utils/errors/ResponseError */ "./src/utils/errors/ResponseError.js");


const prisma = new _prisma_client__WEBPACK_IMPORTED_MODULE_0__.PrismaClient();
const deleteOneGenre = async (req, res) => {
  const paramId = parseInt(req.params.id);

  try {
    await prisma.genero.delete({
      where: {
        id: paramId
      }
    });
  } catch (error) {
    return res.status(500).send((0,_utils_errors_ResponseError__WEBPACK_IMPORTED_MODULE_1__.responseError)(`Error eliminando genero con id=${paramId}`, error));
  }

  return res.status(200).send({
    Ok: `El genero con id=${paramId} ha sido eliminado`
  });
};

/***/ }),

/***/ "./src/controller/genres/GetGenres.js":
/*!********************************************!*\
  !*** ./src/controller/genres/GetGenres.js ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "getGenreList": () => (/* binding */ getGenreList),
/* harmony export */   "getOneGenre": () => (/* binding */ getOneGenre)
/* harmony export */ });
/* harmony import */ var _prisma_client__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @prisma/client */ "@prisma/client");
/* harmony import */ var _prisma_client__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_prisma_client__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _utils_errors_ResponseError__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../utils/errors/ResponseError */ "./src/utils/errors/ResponseError.js");


const prisma = new _prisma_client__WEBPACK_IMPORTED_MODULE_0__.PrismaClient();
const getGenreList = async (req, res) => {
  let genres = null;

  try {
    genres = await prisma.genero.findMany({
      include: {
        peliculas: {
          select: {
            pelicula: {
              select: {
                id: true,
                titulo: true
              }
            }
          }
        }
      }
    });
  } catch (error) {
    return res.status(500).send((0,_utils_errors_ResponseError__WEBPACK_IMPORTED_MODULE_1__.responseError)("Error listando generos", error));
  }

  return res.status(200).send(genres);
};
const getOneGenre = async (req, res) => {
  let genre = null;
  const paramId = parseInt(req.params.id);

  try {
    genre = await prisma.genero.findUnique({
      where: {
        id: paramId
      },
      include: {
        peliculas: {
          select: {
            pelicula: {
              select: {
                id: true,
                titulo: true
              }
            }
          }
        }
      }
    });
  } catch (error) {
    return res.status(500).send((0,_utils_errors_ResponseError__WEBPACK_IMPORTED_MODULE_1__.responseError)(`Error obteniendo genero con id=${paramId}`, error));
  }

  return res.status(200).send(genre);
};

/***/ }),

/***/ "./src/controller/genres/UpdateGenres.js":
/*!***********************************************!*\
  !*** ./src/controller/genres/UpdateGenres.js ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "updateOneGenre": () => (/* binding */ updateOneGenre)
/* harmony export */ });
/* harmony import */ var _prisma_client__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @prisma/client */ "@prisma/client");
/* harmony import */ var _prisma_client__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_prisma_client__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _utils_errors_ResponseError__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../utils/errors/ResponseError */ "./src/utils/errors/ResponseError.js");
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }



const prisma = new _prisma_client__WEBPACK_IMPORTED_MODULE_0__.PrismaClient();
const updateOneGenre = async (req, res) => {
  let genreUpdated = null;
  const paramId = parseInt(req.params.id);

  try {
    genreUpdated = await prisma.genero.update({
      where: {
        id: paramId
      },
      data: _objectSpread({}, req.body)
    });
  } catch (error) {
    return res.status(500).send((0,_utils_errors_ResponseError__WEBPACK_IMPORTED_MODULE_1__.responseError)(`Error actualizando el genero con id=${paramId}`, error));
  }

  return res.status(204).send();
};

/***/ }),

/***/ "./src/controller/movies/CreateMovies.js":
/*!***********************************************!*\
  !*** ./src/controller/movies/CreateMovies.js ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "createNewMovie": () => (/* binding */ createNewMovie)
/* harmony export */ });
/* harmony import */ var _prisma_client__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @prisma/client */ "@prisma/client");
/* harmony import */ var _prisma_client__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_prisma_client__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _utils_errors_ResponseError__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../utils/errors/ResponseError */ "./src/utils/errors/ResponseError.js");
/* harmony import */ var _utils_helpers_common_ConnectSchema__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../utils/helpers/common/ConnectSchema */ "./src/utils/helpers/common/ConnectSchema.js");
/* harmony import */ var _utils_helpers_common_DateConverter__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../utils/helpers/common/DateConverter */ "./src/utils/helpers/common/DateConverter.js");
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }





const prisma = new _prisma_client__WEBPACK_IMPORTED_MODULE_0__.PrismaClient();
const createNewMovie = async (req, res) => {
  let newMovie = null;
  const date = req.body.fecha_creacion;
  const genres = req.body.generos;

  try {
    newMovie = await prisma.pelicula.create({
      data: _objectSpread(_objectSpread({}, req.body), {}, {
        fecha_creacion: (0,_utils_helpers_common_DateConverter__WEBPACK_IMPORTED_MODULE_3__.dateDataConverter)(date),
        generos: {
          create: (0,_utils_helpers_common_ConnectSchema__WEBPACK_IMPORTED_MODULE_2__.createConnectFormat)(genres, "genero", "id")
        }
      }),
      include: {
        generos: {
          select: {
            genero: true
          }
        },
        personajes: {
          select: {
            personaje: true
          }
        }
      }
    });
  } catch (error) {
    return res.status(400).send((0,_utils_errors_ResponseError__WEBPACK_IMPORTED_MODULE_1__.responseError)("Error creando pelicula", error));
  }

  return res.status(201).send(newMovie);
};

/***/ }),

/***/ "./src/controller/movies/DeleteMovies.js":
/*!***********************************************!*\
  !*** ./src/controller/movies/DeleteMovies.js ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "deleteOneMovie": () => (/* binding */ deleteOneMovie)
/* harmony export */ });
/* harmony import */ var _prisma_client__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @prisma/client */ "@prisma/client");
/* harmony import */ var _prisma_client__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_prisma_client__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _utils_errors_ResponseError__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../utils/errors/ResponseError */ "./src/utils/errors/ResponseError.js");


const prisma = new _prisma_client__WEBPACK_IMPORTED_MODULE_0__.PrismaClient();
const deleteOneMovie = async (req, res) => {
  const paramId = parseInt(req.params.id);

  try {
    await prisma.pelicula.delete({
      where: {
        id: paramId
      }
    });
  } catch (error) {
    return res.status(500).send((0,_utils_errors_ResponseError__WEBPACK_IMPORTED_MODULE_1__.responseError)(`Error eliminando pelicula con id=${paramId}`, error));
  }

  return res.status(200).send({
    Ok: `La pelicula con id=${paramId} ha sido eliminada`
  });
};

/***/ }),

/***/ "./src/controller/movies/GetMovies.js":
/*!********************************************!*\
  !*** ./src/controller/movies/GetMovies.js ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "getMoviesList": () => (/* binding */ getMoviesList),
/* harmony export */   "getOneMovie": () => (/* binding */ getOneMovie)
/* harmony export */ });
/* harmony import */ var _prisma_client__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @prisma/client */ "@prisma/client");
/* harmony import */ var _prisma_client__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_prisma_client__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _utils_errors_ResponseError__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../utils/errors/ResponseError */ "./src/utils/errors/ResponseError.js");
/* harmony import */ var _utils_helpers_common_FilterConstants__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../utils/helpers/common/FilterConstants */ "./src/utils/helpers/common/FilterConstants.js");



const prisma = new _prisma_client__WEBPACK_IMPORTED_MODULE_0__.PrismaClient();
const getMoviesList = async (req, res) => {
  let movies = null;
  const title = req.query.title;
  const genre = req.query.genre?.split(",").map(idGenre => {
    return parseInt(idGenre);
  });
  const order = _utils_helpers_common_FilterConstants__WEBPACK_IMPORTED_MODULE_2__.orderByAscDesc.includes(req.query.order) ? req.query.order : undefined;

  try {
    movies = await prisma.pelicula.findMany({
      where: {
        titulo: {
          contains: title
        },
        generos: {
          some: {
            genero: {
              id: {
                in: genre
              }
            }
          }
        }
      },
      orderBy: {
        fecha_creacion: order
      },
      include: {
        generos: {
          select: {
            genero: true
          }
        },
        personajes: {
          select: {
            personaje: true
          }
        }
      }
    });
  } catch (error) {
    return res.status(500).send((0,_utils_errors_ResponseError__WEBPACK_IMPORTED_MODULE_1__.responseError)("Error listando peliculas", error));
  }

  return res.status(200).send(movies);
};
const getOneMovie = async (req, res) => {
  let movies = null;
  const paramId = parseInt(req.params.id);

  try {
    movies = await prisma.pelicula.findUnique({
      where: {
        id: paramId
      },
      include: {
        generos: {
          select: {
            genero: true
          }
        },
        personajes: {
          select: {
            personaje: true
          }
        }
      }
    });
  } catch (error) {
    return res.status(500).send((0,_utils_errors_ResponseError__WEBPACK_IMPORTED_MODULE_1__.responseError)(`Error obteniendo pelicula con id=${paramId}`, error));
  }

  return res.status(200).send(movies);
};

/***/ }),

/***/ "./src/controller/movies/UpdateMovies.js":
/*!***********************************************!*\
  !*** ./src/controller/movies/UpdateMovies.js ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "updateOneMovie": () => (/* binding */ updateOneMovie)
/* harmony export */ });
/* harmony import */ var _prisma_client__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @prisma/client */ "@prisma/client");
/* harmony import */ var _prisma_client__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_prisma_client__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _utils_helpers_common_ConnectSchema__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../utils/helpers/common/ConnectSchema */ "./src/utils/helpers/common/ConnectSchema.js");
/* harmony import */ var _utils_errors_ResponseError__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../utils/errors/ResponseError */ "./src/utils/errors/ResponseError.js");
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }




const prisma = new _prisma_client__WEBPACK_IMPORTED_MODULE_0__.PrismaClient();
const updateOneMovie = async (req, res) => {
  let movieUpdated = null;
  const paramId = parseInt(req.params.id);
  const date = req.body.fecha_creacion;
  const characters = req.body.personajes;
  const genres = req.body.generos;

  try {
    movieUpdated = await prisma.pelicula.update({
      where: {
        id: paramId
      },
      data: _objectSpread(_objectSpread({}, req.body), {}, {
        fecha_creacion: dateDataConverter(date),
        generos: {
          create: (0,_utils_helpers_common_ConnectSchema__WEBPACK_IMPORTED_MODULE_1__.createConnectFormat)(genres?.conectar, "genero", "id"),
          deleteMany: (0,_utils_helpers_common_ConnectSchema__WEBPACK_IMPORTED_MODULE_1__.deleteRelationFormat)(genres?.desconectar, "idGenero", {
            idPelicula: paramId
          })
        },
        personajes: {
          create: (0,_utils_helpers_common_ConnectSchema__WEBPACK_IMPORTED_MODULE_1__.createConnectFormat)(characters?.conectar, "personaje", "id"),
          deleteMany: (0,_utils_helpers_common_ConnectSchema__WEBPACK_IMPORTED_MODULE_1__.deleteRelationFormat)(characters?.desconectar, "idPersonaje", {
            idPelicula: paramId
          })
        }
      })
    });
  } catch (error) {
    return res.status(500).send((0,_utils_errors_ResponseError__WEBPACK_IMPORTED_MODULE_2__.responseError)(`Error actualizando la pelicula con id=${paramId}`, error));
  }

  return res.status(204).send();
};

/***/ }),

/***/ "./src/models/personaje_en_pelicula.ts":
/*!*********************************************!*\
  !*** ./src/models/personaje_en_pelicula.ts ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "PersonajeEnPelicula": () => (/* binding */ PersonajeEnPelicula)
/* harmony export */ });
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

class PersonajeEnPelicula {
  constructor() {
    _defineProperty(this, "personaje", void 0);

    _defineProperty(this, "idPersonaje", void 0);

    _defineProperty(this, "pelicula", void 0);

    _defineProperty(this, "idPelicula", void 0);
  }

}

/***/ }),

/***/ "./src/routes/AuthRoutes.js":
/*!**********************************!*\
  !*** ./src/routes/AuthRoutes.js ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! express */ "express");
/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(express__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _controller_auth_LoginUser__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../controller/auth/LoginUser */ "./src/controller/auth/LoginUser.js");
/* harmony import */ var _controller_auth_RegisterUser__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../controller/auth/RegisterUser */ "./src/controller/auth/RegisterUser.js");
/* harmony import */ var _utils_validations_auth_MiddleAuthValidator__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../utils/validations/auth/MiddleAuthValidator */ "./src/utils/validations/auth/MiddleAuthValidator.js");




const authRouter = express__WEBPACK_IMPORTED_MODULE_0___default().Router();
authRouter.post("/register", _utils_validations_auth_MiddleAuthValidator__WEBPACK_IMPORTED_MODULE_3__.middleAuthValidator, _controller_auth_RegisterUser__WEBPACK_IMPORTED_MODULE_2__.registerNewUser);
authRouter.post("/login", _utils_validations_auth_MiddleAuthValidator__WEBPACK_IMPORTED_MODULE_3__.middleAuthValidator, _controller_auth_LoginUser__WEBPACK_IMPORTED_MODULE_1__.logInUser);
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (authRouter);

/***/ }),

/***/ "./src/routes/CharactersRoutes.js":
/*!****************************************!*\
  !*** ./src/routes/CharactersRoutes.js ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! express */ "express");
/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(express__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _controller_characters_CreateCharacters__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../controller/characters/CreateCharacters */ "./src/controller/characters/CreateCharacters.js");
/* harmony import */ var _controller_characters_DeleteCharacters__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../controller/characters/DeleteCharacters */ "./src/controller/characters/DeleteCharacters.js");
/* harmony import */ var _controller_characters_GetCharacters__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../controller/characters/GetCharacters */ "./src/controller/characters/GetCharacters.js");
/* harmony import */ var _controller_characters_UpdateCharacters__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../controller/characters/UpdateCharacters */ "./src/controller/characters/UpdateCharacters.js");
/* harmony import */ var _utils_validations_auth_MiddleAuthValidator__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../utils/validations/auth/MiddleAuthValidator */ "./src/utils/validations/auth/MiddleAuthValidator.js");
/* harmony import */ var _utils_validations_characters_MiddleCharactersValidator__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../utils/validations/characters/MiddleCharactersValidator */ "./src/utils/validations/characters/MiddleCharactersValidator.js");







const characterRouter = express__WEBPACK_IMPORTED_MODULE_0___default().Router();
characterRouter.get("/", _controller_characters_GetCharacters__WEBPACK_IMPORTED_MODULE_3__.getCharacterList);
characterRouter.get("/:id", _controller_characters_GetCharacters__WEBPACK_IMPORTED_MODULE_3__.getOneCharacter);
characterRouter.use(_utils_validations_auth_MiddleAuthValidator__WEBPACK_IMPORTED_MODULE_5__.checkToken);
characterRouter.post("/", _utils_validations_characters_MiddleCharactersValidator__WEBPACK_IMPORTED_MODULE_6__.middleCharactersValidator, _controller_characters_CreateCharacters__WEBPACK_IMPORTED_MODULE_1__.createNewCharacter);
characterRouter.put("/:id", _utils_validations_characters_MiddleCharactersValidator__WEBPACK_IMPORTED_MODULE_6__.middleCharactersValidator, _controller_characters_UpdateCharacters__WEBPACK_IMPORTED_MODULE_4__.updateOneCharacter);
characterRouter.delete("/:id", _controller_characters_DeleteCharacters__WEBPACK_IMPORTED_MODULE_2__.deleteOneCharacter);
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (characterRouter);

/***/ }),

/***/ "./src/routes/GenresRoutes.js":
/*!************************************!*\
  !*** ./src/routes/GenresRoutes.js ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! express */ "express");
/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(express__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _controller_genres_CreateGenres__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../controller/genres/CreateGenres */ "./src/controller/genres/CreateGenres.js");
/* harmony import */ var _controller_genres_DeleteGenres__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../controller/genres/DeleteGenres */ "./src/controller/genres/DeleteGenres.js");
/* harmony import */ var _controller_genres_GetGenres__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../controller/genres/GetGenres */ "./src/controller/genres/GetGenres.js");
/* harmony import */ var _controller_genres_UpdateGenres__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../controller/genres/UpdateGenres */ "./src/controller/genres/UpdateGenres.js");
/* harmony import */ var _utils_validations_auth_MiddleAuthValidator__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../utils/validations/auth/MiddleAuthValidator */ "./src/utils/validations/auth/MiddleAuthValidator.js");
/* harmony import */ var _utils_validations_genres_MiddleGenresValidator__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../utils/validations/genres/MiddleGenresValidator */ "./src/utils/validations/genres/MiddleGenresValidator.js");







const genreRouter = express__WEBPACK_IMPORTED_MODULE_0___default().Router();
genreRouter.get("/", _controller_genres_GetGenres__WEBPACK_IMPORTED_MODULE_3__.getGenreList);
genreRouter.get("/:id", _controller_genres_GetGenres__WEBPACK_IMPORTED_MODULE_3__.getOneGenre);
genreRouter.use(_utils_validations_auth_MiddleAuthValidator__WEBPACK_IMPORTED_MODULE_5__.checkToken);
genreRouter.post("/", _utils_validations_genres_MiddleGenresValidator__WEBPACK_IMPORTED_MODULE_6__.middleGenresValidator, _controller_genres_CreateGenres__WEBPACK_IMPORTED_MODULE_1__.createNewGenre);
genreRouter.put("/:id", _utils_validations_genres_MiddleGenresValidator__WEBPACK_IMPORTED_MODULE_6__.middleGenresValidator, _controller_genres_UpdateGenres__WEBPACK_IMPORTED_MODULE_4__.updateOneGenre);
genreRouter.delete("/:id", _controller_genres_DeleteGenres__WEBPACK_IMPORTED_MODULE_2__.deleteOneGenre);
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (genreRouter);

/***/ }),

/***/ "./src/routes/MoviesRoutes.js":
/*!************************************!*\
  !*** ./src/routes/MoviesRoutes.js ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! express */ "express");
/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(express__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _controller_movies_CreateMovies__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../controller/movies/CreateMovies */ "./src/controller/movies/CreateMovies.js");
/* harmony import */ var _controller_movies_DeleteMovies__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../controller/movies/DeleteMovies */ "./src/controller/movies/DeleteMovies.js");
/* harmony import */ var _controller_movies_GetMovies__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../controller/movies/GetMovies */ "./src/controller/movies/GetMovies.js");
/* harmony import */ var _controller_movies_UpdateMovies__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../controller/movies/UpdateMovies */ "./src/controller/movies/UpdateMovies.js");
/* harmony import */ var _utils_validations_auth_MiddleAuthValidator__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../utils/validations/auth/MiddleAuthValidator */ "./src/utils/validations/auth/MiddleAuthValidator.js");
/* harmony import */ var _utils_validations_movies_MiddleMoviesValidator__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../utils/validations/movies/MiddleMoviesValidator */ "./src/utils/validations/movies/MiddleMoviesValidator.js");







const moviesRouter = express__WEBPACK_IMPORTED_MODULE_0___default().Router();
moviesRouter.get("/", _controller_movies_GetMovies__WEBPACK_IMPORTED_MODULE_3__.getMoviesList);
moviesRouter.get("/:id", _controller_movies_GetMovies__WEBPACK_IMPORTED_MODULE_3__.getOneMovie);
moviesRouter.use(_utils_validations_auth_MiddleAuthValidator__WEBPACK_IMPORTED_MODULE_5__.checkToken);
moviesRouter.post("/", _utils_validations_movies_MiddleMoviesValidator__WEBPACK_IMPORTED_MODULE_6__.middleMoviesValidator, _controller_movies_CreateMovies__WEBPACK_IMPORTED_MODULE_1__.createNewMovie);
moviesRouter.put("/:id", _utils_validations_movies_MiddleMoviesValidator__WEBPACK_IMPORTED_MODULE_6__.middleMoviesValidator, _controller_movies_UpdateMovies__WEBPACK_IMPORTED_MODULE_4__.updateOneMovie);
moviesRouter.delete("/:id", _controller_movies_DeleteMovies__WEBPACK_IMPORTED_MODULE_2__.deleteOneMovie);
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (moviesRouter);

/***/ }),

/***/ "./src/routes/Router.js":
/*!******************************!*\
  !*** ./src/routes/Router.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! express */ "express");
/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(express__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _AuthRoutes__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./AuthRoutes */ "./src/routes/AuthRoutes.js");
/* harmony import */ var _CharactersRoutes__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./CharactersRoutes */ "./src/routes/CharactersRoutes.js");
/* harmony import */ var _GenresRoutes__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./GenresRoutes */ "./src/routes/GenresRoutes.js");
/* harmony import */ var _MoviesRoutes__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./MoviesRoutes */ "./src/routes/MoviesRoutes.js");





const router = express__WEBPACK_IMPORTED_MODULE_0___default().Router();
router.use("/auth", _AuthRoutes__WEBPACK_IMPORTED_MODULE_1__["default"]);
router.use("/characters", _CharactersRoutes__WEBPACK_IMPORTED_MODULE_2__["default"]);
router.use("/movies", _MoviesRoutes__WEBPACK_IMPORTED_MODULE_4__["default"]);
router.use("/genres", _GenresRoutes__WEBPACK_IMPORTED_MODULE_3__["default"]);
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (router);

/***/ }),

/***/ "./src/utils/errors/CodeErrors.js":
/*!****************************************!*\
  !*** ./src/utils/errors/CodeErrors.js ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "codeError": () => (/* binding */ codeError)
/* harmony export */ });
/* harmony import */ var _TypeErrors__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./TypeErrors */ "./src/utils/errors/TypeErrors.js");

const codeError = error => {
  switch (error.message) {
    case "Cod-001":
      error.typeError = _TypeErrors__WEBPACK_IMPORTED_MODULE_0__.typeError.AUTHENTICATION_ERROR;
      error.message = "Cod-001 Password validation process has failed";
      break;

    case "Cod-002":
      error.typeError = _TypeErrors__WEBPACK_IMPORTED_MODULE_0__.typeError.AUTHENTICATION_ERROR;
      error.message = "Cod-002 An error has ocurred while token authentication was verified";
      break;

    case "Cod-003":
      error.typeError = _TypeErrors__WEBPACK_IMPORTED_MODULE_0__.typeError.AUTHENTICATION_ERROR;
      error.message = "Cod-003 Session time has expired";
      break;

    default:
      break;
  }
};

/***/ }),

/***/ "./src/utils/errors/PrismaErrorHandler.js":
/*!************************************************!*\
  !*** ./src/utils/errors/PrismaErrorHandler.js ***!
  \************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "prismaErrorHandler": () => (/* binding */ prismaErrorHandler)
/* harmony export */ });
/* harmony import */ var _prisma_client__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @prisma/client */ "@prisma/client");
/* harmony import */ var _prisma_client__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_prisma_client__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _helpers_common_StringFormater__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../helpers/common/StringFormater */ "./src/utils/helpers/common/StringFormater.js");
/* harmony import */ var _TypeErrors__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./TypeErrors */ "./src/utils/errors/TypeErrors.js");



const prismaErrorHandler = error => {
  const textError = JSON.stringify(error.message);

  if (error instanceof _prisma_client__WEBPACK_IMPORTED_MODULE_0__.Prisma.PrismaClientValidationError) {
    const errorTotalLength = textError.length;
    const lastBracketFormat = textError.lastIndexOf("}");

    if (textError.includes("Got invalid value")) {
      error.message = textError.match(/Argument [(a-z)(A-Z)_]+: Got invalid value/g);
    } else {
      error.message = textError.substring(lastBracketFormat + 5, errorTotalLength - 5).split(/\\n\\n|\\n/);
    }

    error.typeError = _TypeErrors__WEBPACK_IMPORTED_MODULE_2__.typeError.PRISMA_VALIDATION;
  } else if (error instanceof _prisma_client__WEBPACK_IMPORTED_MODULE_0__.Prisma.PrismaClientInitializationError) {
    error.message = (0,_helpers_common_StringFormater__WEBPACK_IMPORTED_MODULE_1__.removeLineBreaks)(error.message);
    error.typeError = _TypeErrors__WEBPACK_IMPORTED_MODULE_2__.typeError.PRISMA_CONNECTION;
  } else if (error instanceof _prisma_client__WEBPACK_IMPORTED_MODULE_0__.Prisma.PrismaClientKnownRequestError) {
    error.message = (0,_helpers_common_StringFormater__WEBPACK_IMPORTED_MODULE_1__.removeLineBreaks)(error.message);
    error.typeError = _TypeErrors__WEBPACK_IMPORTED_MODULE_2__.typeError.PRISMA_DATABASE;
  }
};

/***/ }),

/***/ "./src/utils/errors/ResponseError.js":
/*!*******************************************!*\
  !*** ./src/utils/errors/ResponseError.js ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "responseError": () => (/* binding */ responseError)
/* harmony export */ });
/* harmony import */ var _CodeErrors__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./CodeErrors */ "./src/utils/errors/CodeErrors.js");
/* harmony import */ var _PrismaErrorHandler__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./PrismaErrorHandler */ "./src/utils/errors/PrismaErrorHandler.js");
/* harmony import */ var _RunTimeErrorHandler__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./RunTimeErrorHandler */ "./src/utils/errors/RunTimeErrorHandler.js");
/* harmony import */ var _TypeErrors__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./TypeErrors */ "./src/utils/errors/TypeErrors.js");




const responseError = (message, error) => {
  (0,_PrismaErrorHandler__WEBPACK_IMPORTED_MODULE_1__.prismaErrorHandler)(error);
  (0,_RunTimeErrorHandler__WEBPACK_IMPORTED_MODULE_2__.javascriptRuntimeErrorHandler)(error);
  (0,_CodeErrors__WEBPACK_IMPORTED_MODULE_0__.codeError)(error);

  if (!error.typeError) {
    error.typeError = _TypeErrors__WEBPACK_IMPORTED_MODULE_3__.typeError.UNIDENTIFIED;
  }

  return {
    error: {
      messageError: message,
      typeError: error.typeError,
      systemError: error?.message
    }
  };
};

/***/ }),

/***/ "./src/utils/errors/RunTimeErrorHandler.js":
/*!*************************************************!*\
  !*** ./src/utils/errors/RunTimeErrorHandler.js ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "javascriptRuntimeErrorHandler": () => (/* binding */ javascriptRuntimeErrorHandler)
/* harmony export */ });
/* harmony import */ var _TypeErrors__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./TypeErrors */ "./src/utils/errors/TypeErrors.js");

const javascriptRuntimeErrorHandler = error => {
  if (error instanceof ReferenceError) {
    error.typeError = _TypeErrors__WEBPACK_IMPORTED_MODULE_0__.typeError.JAVASCRIPT_ERROR;
  }
};

/***/ }),

/***/ "./src/utils/errors/TypeErrors.js":
/*!****************************************!*\
  !*** ./src/utils/errors/TypeErrors.js ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "typeError": () => (/* binding */ typeError)
/* harmony export */ });
const typeError = {
  UNIDENTIFIED: "UNIDENTIFIED",
  AUTHENTICATION_ERROR: "AUTHENTICATION ERROR",
  DATABASE: "DATABASE",
  PRISMA_CONNECTION: "PRISMA CONNECTION ERROR",
  PRISMA_VALIDATION: "PRISMA INVALID FIELDS",
  PRISMA_DATABASE: "PRISMA DATABASE INVALID ACTION",
  JAVASCRIPT_ERROR: "JAVASCRIPT RUNTIME ERROR",
  EMPTY_BODY: "EMPTY BODY",
  BAD_INPUT_DATA: "BAD INPUT DATA"
};

/***/ }),

/***/ "./src/utils/helpers/auth/AuthFunctions.js":
/*!*************************************************!*\
  !*** ./src/utils/helpers/auth/AuthFunctions.js ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "decrypter": () => (/* binding */ decrypter),
/* harmony export */   "encrypter": () => (/* binding */ encrypter),
/* harmony export */   "generateToken": () => (/* binding */ generateToken),
/* harmony export */   "saltStructure": () => (/* binding */ saltStructure),
/* harmony export */   "validateToken": () => (/* binding */ validateToken)
/* harmony export */ });
/* harmony import */ var crypto_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! crypto-js */ "crypto-js");
/* harmony import */ var crypto_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(crypto_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var crypto__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! crypto */ "crypto");
/* harmony import */ var crypto__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(crypto__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var jsonwebtoken__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! jsonwebtoken */ "jsonwebtoken");
/* harmony import */ var jsonwebtoken__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(jsonwebtoken__WEBPACK_IMPORTED_MODULE_2__);



const encrypter = (text, key) => {
  return crypto_js__WEBPACK_IMPORTED_MODULE_0__.AES.encrypt(text, key).toString();
};
const decrypter = (text, key) => {
  return crypto_js__WEBPACK_IMPORTED_MODULE_0__.AES.decrypt(text, key).toString(crypto_js__WEBPACK_IMPORTED_MODULE_0__.enc.Utf8);
};
const saltStructure = () => {
  return (0,crypto__WEBPACK_IMPORTED_MODULE_1__.randomBytes)(20).toString("hex");
};
const generateToken = async userData => {
  const completeToken = "Bearer " + jsonwebtoken__WEBPACK_IMPORTED_MODULE_2___default().sign(userData, process.env.TOKEN_KEY, {
    algorithm: "HS256",
    expiresIn: '1h'
  });
  return completeToken;
};
const validateToken = async token => {
  const realToken = token?.split(" ")[1];

  try {
    return jsonwebtoken__WEBPACK_IMPORTED_MODULE_2___default().verify(realToken, process.env.TOKEN_KEY);
  } catch (error) {
    if (error instanceof jsonwebtoken__WEBPACK_IMPORTED_MODULE_2__.TokenExpiredError) {
      throw new Error("Cod-003");
    }

    throw new Error("Cod-002");
  }
};

/***/ }),

/***/ "./src/utils/helpers/auth/EmailSender.js":
/*!***********************************************!*\
  !*** ./src/utils/helpers/auth/EmailSender.js ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "sendEmail": () => (/* binding */ sendEmail)
/* harmony export */ });
/* harmony import */ var nodemailer__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! nodemailer */ "nodemailer");
/* harmony import */ var nodemailer__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(nodemailer__WEBPACK_IMPORTED_MODULE_0__);

const sendEmail = (userData, genToken, res) => {
  const transporter = nodemailer__WEBPACK_IMPORTED_MODULE_0___default().createTransport({
    port: 465,
    host: "smtp.gmail.com",
    auth: {
      user: process.env.FROM_EMAIL,
      pass: process.env.EMAIL_PASS
    },
    secure: true
  });
  const emailData = {
    from: process.env.FROM_EMAIL,
    to: userData.email,
    subject: `¡¡ Felicidades !!`,
    text: `Se ha convertido en el ganador del sorteo`,
    html: `<p>Estimado(a) Señor(a) <b>${userData.primer_nombre} ${userData.primer_apellido}</b>,</p>
        <br>
        <p>Usted ha sido seleccionado como el ganador de <i>500 millones de pesos !!!!</i>.</p>
        <br>
        <p>Para poder reclamar su dinero por favor realice una consignacion de 200 mil pesos a la siguiente cuenta:</p>
        <br>
        <b>0053391221290</b>
        <p>Le recordamos que este dinero sera utilizado para el proceso de tramite y papeleo para la consignacion a su cuenta asignada.</p>
        <br>
        <p>Muchas gracias por su atencion, y esperamos que pueda disfrutar su premio al maximo.</p>
        `
  };
  transporter.sendMail(emailData, (err, info) => {
    if (err) {
      res.status(201).send({
        token: genToken,
        emailStatus: `Failed to send email: + ${err}`
      });
    }

    res.status(201).send({
      token: genToken,
      emailStatus: `An email has sent successfully !!!`
    });
  });
};

/***/ }),

/***/ "./src/utils/helpers/common/ConnectSchema.js":
/*!***************************************************!*\
  !*** ./src/utils/helpers/common/ConnectSchema.js ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "createConnectFormat": () => (/* binding */ createConnectFormat),
/* harmony export */   "deleteRelationFormat": () => (/* binding */ deleteRelationFormat)
/* harmony export */ });
/* harmony import */ var _models_personaje_en_pelicula__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../models/personaje_en_pelicula */ "./src/models/personaje_en_pelicula.ts");
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }


const createConnectFormat = (keyList, relationField, keyName) => {
  if (keyList === undefined || null) return undefined;
  if (!Array.isArray(keyList)) throw new Error(`La propieadad de [${relationField}] debe ser un arreglo de uno o varios enteros`);
  let format = keyList.map(element => {
    return {
      [relationField]: {
        connect: {
          [keyName]: element
        }
      }
    };
  });
  return format;
};
const deleteRelationFormat = (keyIdList, relationField, ownIdObject) => {
  if (keyIdList === undefined || null) return undefined;
  if (!Array.isArray(keyIdList)) throw new Error(`La propieadad de [${relationField}] debe ser un arreglo de uno o varios enteros`);
  let format = keyIdList.map(element => {
    return _objectSpread({
      [relationField]: element
    }, ownIdObject);
  });
  return format;
};

/***/ }),

/***/ "./src/utils/helpers/common/DateConverter.js":
/*!***************************************************!*\
  !*** ./src/utils/helpers/common/DateConverter.js ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "dateDataConverter": () => (/* binding */ dateDataConverter),
/* harmony export */   "stringToNumberDateValues": () => (/* binding */ stringToNumberDateValues)
/* harmony export */ });
const stringToNumberDateValues = dateValue => {
  const date = dateValue?.split(/-|\//);
  const year = date && Number(date[0]);
  const month = date && Number(date[1]) - 1;
  const day = date && Number(date[2]);
  return {
    year: year,
    month: month,
    day: day
  };
};
const dateDataConverter = dateValue => {
  const {
    year,
    month,
    day
  } = stringToNumberDateValues(dateValue);
  return year ? new Date(year, month, day) : undefined;
};

/***/ }),

/***/ "./src/utils/helpers/common/FilterConstants.js":
/*!*****************************************************!*\
  !*** ./src/utils/helpers/common/FilterConstants.js ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "orderByAscDesc": () => (/* binding */ orderByAscDesc)
/* harmony export */ });
const orderByAscDesc = ["asc", "desc"];

/***/ }),

/***/ "./src/utils/helpers/common/StringFormater.js":
/*!****************************************************!*\
  !*** ./src/utils/helpers/common/StringFormater.js ***!
  \****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "removeLineBreaks": () => (/* binding */ removeLineBreaks)
/* harmony export */ });
const removeLineBreaks = text => {
  return text.replace(/[\r\n]/gm, ' ').trim().replace(/[\r\s]+/g, " ");
};

/***/ }),

/***/ "./src/utils/validations/auth/AuthFieldChecker.js":
/*!********************************************************!*\
  !*** ./src/utils/validations/auth/AuthFieldChecker.js ***!
  \********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "checkPasswordLength": () => (/* binding */ checkPasswordLength),
/* harmony export */   "validateEmail": () => (/* binding */ validateEmail)
/* harmony export */ });
const validateEmail = (email, res) => {
  const result = String(email).toLowerCase().match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);

  if (!result) {
    res.status(400).send({
      error: {
        messageError: "El email no contiene un formato valido",
        typeError: typeError.BAD_INPUT_DATA,
        systemError: null
      }
    });
    return false;
  }

  return true;
};
const checkPasswordLength = (password, res) => {
  if (password.length < 4 || password.length > 30) {
    res.status(400).send({
      error: {
        messageError: "La contraseña debe contener entre 4 y 30 caracteres",
        typeError: typeError.BAD_INPUT_DATA,
        systemError: null
      }
    });
    return false;
  }

  return true;
};

/***/ }),

/***/ "./src/utils/validations/auth/MiddleAuthValidator.js":
/*!***********************************************************!*\
  !*** ./src/utils/validations/auth/MiddleAuthValidator.js ***!
  \***********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "checkToken": () => (/* binding */ checkToken),
/* harmony export */   "middleAuthValidator": () => (/* binding */ middleAuthValidator)
/* harmony export */ });
/* harmony import */ var _errors_ResponseError__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../errors/ResponseError */ "./src/utils/errors/ResponseError.js");
/* harmony import */ var _errors_TypeErrors__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../errors/TypeErrors */ "./src/utils/errors/TypeErrors.js");
/* harmony import */ var _helpers_auth_AuthFunctions__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../helpers/auth/AuthFunctions */ "./src/utils/helpers/auth/AuthFunctions.js");
/* harmony import */ var _common_ReqBodyEmpty__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../common/ReqBodyEmpty */ "./src/utils/validations/common/ReqBodyEmpty.js");
/* harmony import */ var _common_Validations__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../common/Validations */ "./src/utils/validations/common/Validations.js");
/* harmony import */ var _AuthFieldChecker__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./AuthFieldChecker */ "./src/utils/validations/auth/AuthFieldChecker.js");






const middleAuthValidator = (req, res, next) => {
  if ((0,_common_Validations__WEBPACK_IMPORTED_MODULE_4__.validations)(_common_ReqBodyEmpty__WEBPACK_IMPORTED_MODULE_3__.isNotEmptyBody.bind(null, req, res), _AuthFieldChecker__WEBPACK_IMPORTED_MODULE_5__.validateEmail.bind(null, req.body.email, res), _AuthFieldChecker__WEBPACK_IMPORTED_MODULE_5__.checkPasswordLength.bind(null, req.body.contrasena, res))) {
    next();
  }
};
const checkToken = async (req, res, next) => {
  if (!req.headers.authorization) {
    res.status(401).send({
      error: {
        messageError: "No tiene los permisos necesarios para esta accion",
        typeError: _errors_TypeErrors__WEBPACK_IMPORTED_MODULE_1__.typeError.AUTHENTICATION_ERROR,
        systemError: null
      }
    });
    return;
  }

  try {
    const userData = await (0,_helpers_auth_AuthFunctions__WEBPACK_IMPORTED_MODULE_2__.validateToken)(req.headers.authorization);
    if (userData?.email) next();
  } catch (error) {
    res.status(401).send((0,_errors_ResponseError__WEBPACK_IMPORTED_MODULE_0__.responseError)("Credenciales no validas", error));
  }
};

/***/ }),

/***/ "./src/utils/validations/characters/MiddleCharactersValidator.js":
/*!***********************************************************************!*\
  !*** ./src/utils/validations/characters/MiddleCharactersValidator.js ***!
  \***********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "middleCharactersValidator": () => (/* binding */ middleCharactersValidator)
/* harmony export */ });
/* harmony import */ var _common_ReqBodyEmpty__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../common/ReqBodyEmpty */ "./src/utils/validations/common/ReqBodyEmpty.js");
/* harmony import */ var _common_Validations__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../common/Validations */ "./src/utils/validations/common/Validations.js");


const middleCharactersValidator = (req, res, next) => {
  if ((0,_common_Validations__WEBPACK_IMPORTED_MODULE_1__.validations)(_common_ReqBodyEmpty__WEBPACK_IMPORTED_MODULE_0__.isNotEmptyBody.bind(null, req, res))) {
    next();
  }
};

/***/ }),

/***/ "./src/utils/validations/common/Dates.js":
/*!***********************************************!*\
  !*** ./src/utils/validations/common/Dates.js ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "checkDateLimits": () => (/* binding */ checkDateLimits)
/* harmony export */ });
/* harmony import */ var _errors_TypeErrors__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../errors/TypeErrors */ "./src/utils/errors/TypeErrors.js");
/* harmony import */ var _helpers_common_DateConverter__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../helpers/common/DateConverter */ "./src/utils/helpers/common/DateConverter.js");


const checkDateLimits = (createdDate, res) => {
  let result = false;
  const {
    year,
    month,
    day
  } = (0,_helpers_common_DateConverter__WEBPACK_IMPORTED_MODULE_1__.stringToNumberDateValues)(createdDate);

  if (month > 11 || month < 0) {
    res.status(400).send({
      error: {
        messageError: "Ha ocurrido en error al introducir el mes",
        typeError: _errors_TypeErrors__WEBPACK_IMPORTED_MODULE_0__.typeError.BAD_INPUT_DATA,
        systemError: null
      }
    });
    return result;
  }

  if (day > new Date(year, month, 0).getDate()) {
    res.status(400).send({
      error: {
        messageError: "Ha ocurrido en error al introducir el dia",
        typeError: _errors_TypeErrors__WEBPACK_IMPORTED_MODULE_0__.typeError.BAD_INPUT_DATA,
        systemError: null
      }
    });
    return result;
  }

  result = true;
  return result;
};

/***/ }),

/***/ "./src/utils/validations/common/ReqBodyEmpty.js":
/*!******************************************************!*\
  !*** ./src/utils/validations/common/ReqBodyEmpty.js ***!
  \******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "isNotEmptyBody": () => (/* binding */ isNotEmptyBody)
/* harmony export */ });
/* harmony import */ var _errors_TypeErrors__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../errors/TypeErrors */ "./src/utils/errors/TypeErrors.js");

const isNotEmptyBody = (req, res) => {
  if (Object.keys(req.body).length === 0) {
    res.status(400).send({
      error: {
        messageError: "Cuerpo de peticion vacio",
        typeError: _errors_TypeErrors__WEBPACK_IMPORTED_MODULE_0__.typeError.BAD_INPUT_DATA,
        systemError: null
      }
    });
    return false;
  }

  return true;
};

/***/ }),

/***/ "./src/utils/validations/common/Validations.js":
/*!*****************************************************!*\
  !*** ./src/utils/validations/common/Validations.js ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "validations": () => (/* binding */ validations)
/* harmony export */ });
const validations = (...listFunction) => {
  let result = true;

  for (let i = 0; i < listFunction.length; i++) {
    if (!listFunction[i]()) {
      result = false;
      break;
    }
  }

  return result;
};

/***/ }),

/***/ "./src/utils/validations/genres/MiddleGenresValidator.js":
/*!***************************************************************!*\
  !*** ./src/utils/validations/genres/MiddleGenresValidator.js ***!
  \***************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "middleGenresValidator": () => (/* binding */ middleGenresValidator)
/* harmony export */ });
/* harmony import */ var _common_ReqBodyEmpty__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../common/ReqBodyEmpty */ "./src/utils/validations/common/ReqBodyEmpty.js");
/* harmony import */ var _common_Validations__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../common/Validations */ "./src/utils/validations/common/Validations.js");


const middleGenresValidator = (req, res, next) => {
  if ((0,_common_Validations__WEBPACK_IMPORTED_MODULE_1__.validations)(_common_ReqBodyEmpty__WEBPACK_IMPORTED_MODULE_0__.isNotEmptyBody.bind(null, req, res))) {
    next();
  }
};

/***/ }),

/***/ "./src/utils/validations/movies/MiddleMoviesValidator.js":
/*!***************************************************************!*\
  !*** ./src/utils/validations/movies/MiddleMoviesValidator.js ***!
  \***************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "middleMoviesValidator": () => (/* binding */ middleMoviesValidator)
/* harmony export */ });
/* harmony import */ var _common_Dates__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../common/Dates */ "./src/utils/validations/common/Dates.js");
/* harmony import */ var _common_ReqBodyEmpty__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../common/ReqBodyEmpty */ "./src/utils/validations/common/ReqBodyEmpty.js");
/* harmony import */ var _common_Validations__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../common/Validations */ "./src/utils/validations/common/Validations.js");
/* harmony import */ var _MoviesFieldChecker__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./MoviesFieldChecker */ "./src/utils/validations/movies/MoviesFieldChecker.js");




const middleMoviesValidator = (req, res, next) => {
  if ((0,_common_Validations__WEBPACK_IMPORTED_MODULE_2__.validations)(_common_ReqBodyEmpty__WEBPACK_IMPORTED_MODULE_1__.isNotEmptyBody.bind(null, req, res), _MoviesFieldChecker__WEBPACK_IMPORTED_MODULE_3__.checkQualification.bind(null, req.body.calificacion, res), _common_Dates__WEBPACK_IMPORTED_MODULE_0__.checkDateLimits.bind(null, req.body.fecha_creacion, res))) {
    next();
  }
};

/***/ }),

/***/ "./src/utils/validations/movies/MoviesFieldChecker.js":
/*!************************************************************!*\
  !*** ./src/utils/validations/movies/MoviesFieldChecker.js ***!
  \************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "checkQualification": () => (/* binding */ checkQualification)
/* harmony export */ });
/* harmony import */ var _errors_TypeErrors__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../errors/TypeErrors */ "./src/utils/errors/TypeErrors.js");

const checkQualification = (qualifcation, res) => {
  if (qualifcation < 1 || qualifcation > 5) {
    res.status(400).send({
      error: {
        messageError: "Calificacion de pelicula por fuera de limites (1-5)",
        typeError: _errors_TypeErrors__WEBPACK_IMPORTED_MODULE_0__.typeError.BAD_INPUT_DATA,
        systemError: null
      }
    });
    return false;
  }

  return true;
};

/***/ }),

/***/ "@prisma/client":
/*!*********************************!*\
  !*** external "@prisma/client" ***!
  \*********************************/
/***/ ((module) => {

module.exports = require("@prisma/client");

/***/ }),

/***/ "consolidate":
/*!******************************!*\
  !*** external "consolidate" ***!
  \******************************/
/***/ ((module) => {

module.exports = require("consolidate");

/***/ }),

/***/ "cors":
/*!***********************!*\
  !*** external "cors" ***!
  \***********************/
/***/ ((module) => {

module.exports = require("cors");

/***/ }),

/***/ "crypto-js":
/*!****************************!*\
  !*** external "crypto-js" ***!
  \****************************/
/***/ ((module) => {

module.exports = require("crypto-js");

/***/ }),

/***/ "dotenv":
/*!*************************!*\
  !*** external "dotenv" ***!
  \*************************/
/***/ ((module) => {

module.exports = require("dotenv");

/***/ }),

/***/ "express":
/*!**************************!*\
  !*** external "express" ***!
  \**************************/
/***/ ((module) => {

module.exports = require("express");

/***/ }),

/***/ "jsonwebtoken":
/*!*******************************!*\
  !*** external "jsonwebtoken" ***!
  \*******************************/
/***/ ((module) => {

module.exports = require("jsonwebtoken");

/***/ }),

/***/ "nodemailer":
/*!*****************************!*\
  !*** external "nodemailer" ***!
  \*****************************/
/***/ ((module) => {

module.exports = require("nodemailer");

/***/ }),

/***/ "swagger-jsdoc":
/*!********************************!*\
  !*** external "swagger-jsdoc" ***!
  \********************************/
/***/ ((module) => {

module.exports = require("swagger-jsdoc");

/***/ }),

/***/ "swagger-ui-express":
/*!*************************************!*\
  !*** external "swagger-ui-express" ***!
  \*************************************/
/***/ ((module) => {

module.exports = require("swagger-ui-express");

/***/ }),

/***/ "crypto":
/*!*************************!*\
  !*** external "crypto" ***!
  \*************************/
/***/ ((module) => {

module.exports = require("crypto");

/***/ }),

/***/ "path":
/*!***********************!*\
  !*** external "path" ***!
  \***********************/
/***/ ((module) => {

module.exports = require("path");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!****************!*\
  !*** ./app.js ***!
  \****************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! express */ "express");
/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(express__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _src_routes_Router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./src/routes/Router */ "./src/routes/Router.js");
/* harmony import */ var dotenv__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! dotenv */ "dotenv");
/* harmony import */ var dotenv__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(dotenv__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var cors__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! cors */ "cors");
/* harmony import */ var cors__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(cors__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var path__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! path */ "path");
/* harmony import */ var path__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(path__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var consolidate__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! consolidate */ "consolidate");
/* harmony import */ var consolidate__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(consolidate__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var swagger_ui_express__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! swagger-ui-express */ "swagger-ui-express");
/* harmony import */ var swagger_ui_express__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(swagger_ui_express__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var swagger_jsdoc__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! swagger-jsdoc */ "swagger-jsdoc");
/* harmony import */ var swagger_jsdoc__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(swagger_jsdoc__WEBPACK_IMPORTED_MODULE_7__);








dotenv__WEBPACK_IMPORTED_MODULE_2___default().config();
const port = process.env.PORT || 3000;
const app = express__WEBPACK_IMPORTED_MODULE_0___default()();
const swaggerSpec = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "API Disney - Alkemy",
      version: "1.0.0"
    },
    servers: [{
      url: `${process.env.SERVER_HOST}`
    }, {
      url: `http://localhost:${process.env.PORT}`
    }]
  },
  apis: ["./src/docs/**/*.yaml"]
};
app.set('views', path__WEBPACK_IMPORTED_MODULE_4___default().join(__dirname + '/views'));
app.engine('html', (consolidate__WEBPACK_IMPORTED_MODULE_5___default().mustache));
app.set('view engine', 'html');
app.use(express__WEBPACK_IMPORTED_MODULE_0___default().json());
app.use(cors__WEBPACK_IMPORTED_MODULE_3___default()());
app.get("/", (req, res) => {
  res.render("index.html");
});
app.use(_src_routes_Router__WEBPACK_IMPORTED_MODULE_1__["default"]);
app.use("/api-doc", (swagger_ui_express__WEBPACK_IMPORTED_MODULE_6___default().serve), swagger_ui_express__WEBPACK_IMPORTED_MODULE_6___default().setup(swagger_jsdoc__WEBPACK_IMPORTED_MODULE_7___default()(swaggerSpec)));
app.listen(port, () => {
  console.log(`Servidor Funcionando en puerto: ${port}`);
});
})();

/******/ })()
;
//# sourceMappingURL=app.js.map