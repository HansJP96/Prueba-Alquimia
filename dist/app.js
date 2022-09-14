/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/controller/characters/createCharacters.js":
/*!*******************************************************!*\
  !*** ./src/controller/characters/createCharacters.js ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "createNewCharacter": () => (/* binding */ createNewCharacter)
/* harmony export */ });
/* harmony import */ var _prisma_client__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @prisma/client */ "@prisma/client");
/* harmony import */ var _prisma_client__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_prisma_client__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _utils_helpers_common_connectSchema__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../utils/helpers/common/connectSchema */ "./src/utils/helpers/common/connectSchema.js");
/* harmony import */ var _utils_errors_responseError__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../utils/errors/responseError */ "./src/utils/errors/responseError.js");
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
          create: (0,_utils_helpers_common_connectSchema__WEBPACK_IMPORTED_MODULE_1__.createConnectFormat)(movies, "pelicula", "id")
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
    return res.status(400).send((0,_utils_errors_responseError__WEBPACK_IMPORTED_MODULE_2__.responseError)("Error creando personaje", error));
  }

  return res.status(201).send(newCharacter);
};

/***/ }),

/***/ "./src/controller/characters/deleteCharacters.js":
/*!*******************************************************!*\
  !*** ./src/controller/characters/deleteCharacters.js ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "deleteOneCharacter": () => (/* binding */ deleteOneCharacter)
/* harmony export */ });
/* harmony import */ var _prisma_client__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @prisma/client */ "@prisma/client");
/* harmony import */ var _prisma_client__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_prisma_client__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _utils_errors_responseError__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../utils/errors/responseError */ "./src/utils/errors/responseError.js");


const prisma = new _prisma_client__WEBPACK_IMPORTED_MODULE_0__.PrismaClient();
const deleteOneCharacter = async (res, req) => {
  const paramId = Number(req.params.id);

  try {
    await prisma.personaje.delete({
      where: {
        id: paramId
      }
    });
  } catch (error) {
    return res.status(500).send((0,_utils_errors_responseError__WEBPACK_IMPORTED_MODULE_1__.responseError)(`Error eliminando personaje con id=${paramId}`, error));
  }

  return res.status(200).send(`El personaje con id=${paramId} ha sido eliminado`);
};

/***/ }),

/***/ "./src/controller/characters/getCharacters.js":
/*!****************************************************!*\
  !*** ./src/controller/characters/getCharacters.js ***!
  \****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "getCharacterList": () => (/* binding */ getCharacterList),
/* harmony export */   "getOneCharacter": () => (/* binding */ getOneCharacter)
/* harmony export */ });
/* harmony import */ var _prisma_client__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @prisma/client */ "@prisma/client");
/* harmony import */ var _prisma_client__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_prisma_client__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _utils_errors_responseError__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../utils/errors/responseError */ "./src/utils/errors/responseError.js");


const prisma = new _prisma_client__WEBPACK_IMPORTED_MODULE_0__.PrismaClient();
const getCharacterList = async (req, res) => {
  let characters = null;

  try {
    characters = await prisma.personaje.findMany({
      include: {
        peliculas: {
          select: {
            pelicula: true
          }
        }
      }
    });
  } catch (error) {
    return res.status(500).send((0,_utils_errors_responseError__WEBPACK_IMPORTED_MODULE_1__.responseError)("Error listando personajes", error));
  }

  return res.status(200).send(characters);
};
const getOneCharacter = async (req, res) => {
  let character = null;
  const paramId = Number(req.params.id);

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
    return res.status(500).send((0,_utils_errors_responseError__WEBPACK_IMPORTED_MODULE_1__.responseError)(`Error obteniendo personaje con id=${paramId}`, error));
  }

  return res.status(200).send(character);
};

/***/ }),

/***/ "./src/controller/characters/updateCharacters.js":
/*!*******************************************************!*\
  !*** ./src/controller/characters/updateCharacters.js ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "updateOneCharacter": () => (/* binding */ updateOneCharacter)
/* harmony export */ });
/* harmony import */ var _prisma_client__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @prisma/client */ "@prisma/client");
/* harmony import */ var _prisma_client__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_prisma_client__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _utils_helpers_common_connectSchema__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../utils/helpers/common/connectSchema */ "./src/utils/helpers/common/connectSchema.js");
/* harmony import */ var _utils_errors_responseError__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../utils/errors/responseError */ "./src/utils/errors/responseError.js");
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }




const prisma = new _prisma_client__WEBPACK_IMPORTED_MODULE_0__.PrismaClient();
const updateOneCharacter = async (req, res) => {
  let characterUpdated = null;
  const paramId = Number(req.params.id);
  const movies = req.body.peliculas;

  try {
    characterUpdated = await prisma.personaje.update({
      where: {
        id: paramId
      },
      data: _objectSpread(_objectSpread({}, req.body), {}, {
        peliculas: {
          create: (0,_utils_helpers_common_connectSchema__WEBPACK_IMPORTED_MODULE_1__.createConnectFormat)(movies?.conectar, "pelicula", "id"),
          deleteMany: (0,_utils_helpers_common_connectSchema__WEBPACK_IMPORTED_MODULE_1__.deleteRelationFormat)(movies?.desconectar, "idPelicula", {
            idPersonaje: paramId
          })
        }
      })
    });
  } catch (error) {
    return res.status(500).send((0,_utils_errors_responseError__WEBPACK_IMPORTED_MODULE_2__.responseError)(`Error actualizando personaje con id=${paramId}`, error));
  }

  return res.status(204).send();
};

/***/ }),

/***/ "./src/controller/genres/createGenres.js":
/*!***********************************************!*\
  !*** ./src/controller/genres/createGenres.js ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "createNewGenre": () => (/* binding */ createNewGenre)
/* harmony export */ });
/* harmony import */ var _prisma_client__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @prisma/client */ "@prisma/client");
/* harmony import */ var _prisma_client__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_prisma_client__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _utils_errors_responseError__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../utils/errors/responseError */ "./src/utils/errors/responseError.js");
/* harmony import */ var _utils_helpers_common_imageSetter__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../utils/helpers/common/imageSetter */ "./src/utils/helpers/common/imageSetter.js");
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }




const prisma = new _prisma_client__WEBPACK_IMPORTED_MODULE_0__.PrismaClient();
const createNewGenre = async (req, res) => {
  let newGenre = null; //setDefaultImage(req, "imagen")

  try {
    newGenre = await prisma.genero.create({
      data: _objectSpread({}, req.body)
    });
  } catch (error) {
    return res.status(400).send((0,_utils_errors_responseError__WEBPACK_IMPORTED_MODULE_1__.responseError)("Error creando genero", error));
  }

  return res.status(201).send(newGenre);
};

/***/ }),

/***/ "./src/controller/genres/deleteGenres.js":
/*!***********************************************!*\
  !*** ./src/controller/genres/deleteGenres.js ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "deleteOneGenre": () => (/* binding */ deleteOneGenre)
/* harmony export */ });
/* harmony import */ var _prisma_client__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @prisma/client */ "@prisma/client");
/* harmony import */ var _prisma_client__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_prisma_client__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _utils_errors_responseError__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../utils/errors/responseError */ "./src/utils/errors/responseError.js");


const prisma = new _prisma_client__WEBPACK_IMPORTED_MODULE_0__.PrismaClient();
const deleteOneGenre = async (req, res) => {
  const paramId = Number(req.params.id);

  try {
    await prisma.genero.delete({
      where: {
        id: paramId
      }
    });
  } catch (error) {
    return res.status(500).send((0,_utils_errors_responseError__WEBPACK_IMPORTED_MODULE_1__.responseError)(`Error eliminando genero con id=${paramId}`, error));
  }

  return res.status(200).send({
    Ok: `El genero con id=${paramId} ha sido eliminado`
  });
};

/***/ }),

/***/ "./src/controller/genres/getGenres.js":
/*!********************************************!*\
  !*** ./src/controller/genres/getGenres.js ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "getGenreList": () => (/* binding */ getGenreList),
/* harmony export */   "getOneGenre": () => (/* binding */ getOneGenre)
/* harmony export */ });
/* harmony import */ var _prisma_client__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @prisma/client */ "@prisma/client");
/* harmony import */ var _prisma_client__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_prisma_client__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _utils_errors_responseError__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../utils/errors/responseError */ "./src/utils/errors/responseError.js");


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
    return res.status(500).send((0,_utils_errors_responseError__WEBPACK_IMPORTED_MODULE_1__.responseError)("Error listando generos", error));
  }

  return res.status(200).send(genres);
};
const getOneGenre = async (req, res) => {
  let genre = null;
  const paramId = Number(req.params.id);

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
    return res.status(500).send((0,_utils_errors_responseError__WEBPACK_IMPORTED_MODULE_1__.responseError)(`Error obteniendo genero con id=${paramId}`, error));
  }

  return res.status(200).send(genre);
};

/***/ }),

/***/ "./src/controller/genres/updateGenres.js":
/*!***********************************************!*\
  !*** ./src/controller/genres/updateGenres.js ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "updateOneGenre": () => (/* binding */ updateOneGenre)
/* harmony export */ });
/* harmony import */ var _prisma_client__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @prisma/client */ "@prisma/client");
/* harmony import */ var _prisma_client__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_prisma_client__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _utils_errors_responseError__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../utils/errors/responseError */ "./src/utils/errors/responseError.js");
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }



const prisma = new _prisma_client__WEBPACK_IMPORTED_MODULE_0__.PrismaClient();
const updateOneGenre = async (req, res) => {
  let genreUpdated = null;
  const paramId = Number(req.params.id);

  try {
    genreUpdated = await prisma.genero.update({
      where: {
        id: paramId
      },
      data: _objectSpread({}, req.body)
    });
  } catch (error) {
    return res.status(500).send((0,_utils_errors_responseError__WEBPACK_IMPORTED_MODULE_1__.responseError)(`Error actualizando el genero con id=${paramId}`, error));
  }

  return res.status(204).send();
};

/***/ }),

/***/ "./src/controller/movies/createMovies.js":
/*!***********************************************!*\
  !*** ./src/controller/movies/createMovies.js ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "createNewMovie": () => (/* binding */ createNewMovie)
/* harmony export */ });
/* harmony import */ var _prisma_client__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @prisma/client */ "@prisma/client");
/* harmony import */ var _prisma_client__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_prisma_client__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _utils_errors_responseError__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../utils/errors/responseError */ "./src/utils/errors/responseError.js");
/* harmony import */ var _utils_helpers_common_connectSchema__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../utils/helpers/common/connectSchema */ "./src/utils/helpers/common/connectSchema.js");
/* harmony import */ var _utils_helpers_common_dateConverter__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../utils/helpers/common/dateConverter */ "./src/utils/helpers/common/dateConverter.js");
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
        fecha_creacion: (0,_utils_helpers_common_dateConverter__WEBPACK_IMPORTED_MODULE_3__.dateDataConverter)(date),
        generos: {
          create: (0,_utils_helpers_common_connectSchema__WEBPACK_IMPORTED_MODULE_2__.createConnectFormat)(genres, "genero", "id")
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
    return res.status(400).send((0,_utils_errors_responseError__WEBPACK_IMPORTED_MODULE_1__.responseError)("Error creando pelicula", error));
  }

  return res.status(201).send(newMovie);
};

/***/ }),

/***/ "./src/controller/movies/deleteMovies.js":
/*!***********************************************!*\
  !*** ./src/controller/movies/deleteMovies.js ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "deleteOneMovie": () => (/* binding */ deleteOneMovie)
/* harmony export */ });
/* harmony import */ var _prisma_client__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @prisma/client */ "@prisma/client");
/* harmony import */ var _prisma_client__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_prisma_client__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _utils_errors_responseError__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../utils/errors/responseError */ "./src/utils/errors/responseError.js");


const prisma = new _prisma_client__WEBPACK_IMPORTED_MODULE_0__.PrismaClient();
const deleteOneMovie = async (req, res) => {
  const paramId = Number(req.params.id);

  try {
    await prisma.pelicula.delete({
      where: {
        id: paramId
      }
    });
  } catch (error) {
    return res.status(500).send((0,_utils_errors_responseError__WEBPACK_IMPORTED_MODULE_1__.responseError)(`Error eliminando pelicula con id=${paramId}`, error));
  }

  return res.status(200).send({
    Ok: `La pelicula con id=${paramId} ha sido eliminada`
  });
};

/***/ }),

/***/ "./src/controller/movies/getMovies.js":
/*!********************************************!*\
  !*** ./src/controller/movies/getMovies.js ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "getMoviesList": () => (/* binding */ getMoviesList),
/* harmony export */   "getOneMovie": () => (/* binding */ getOneMovie)
/* harmony export */ });
/* harmony import */ var _prisma_client__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @prisma/client */ "@prisma/client");
/* harmony import */ var _prisma_client__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_prisma_client__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _utils_errors_responseError__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../utils/errors/responseError */ "./src/utils/errors/responseError.js");


const prisma = new _prisma_client__WEBPACK_IMPORTED_MODULE_0__.PrismaClient();
const getMoviesList = async (req, res) => {
  let movies = null;

  try {
    movies = await prisma.pelicula.findMany({
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
    return res.status(500).send((0,_utils_errors_responseError__WEBPACK_IMPORTED_MODULE_1__.responseError)("Error listando peliculas", error));
  }

  return res.status(200).send(movies);
};
const getOneMovie = async (req, res) => {
  let movies = null;
  const paramId = Number(req.params.id);

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
    return res.status(500).send((0,_utils_errors_responseError__WEBPACK_IMPORTED_MODULE_1__.responseError)(`Error obteniendo pelicula con id=${paramId}`, error));
  }

  return res.status(200).send(movies);
};

/***/ }),

/***/ "./src/controller/movies/updateMovies.js":
/*!***********************************************!*\
  !*** ./src/controller/movies/updateMovies.js ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "updateOneMovie": () => (/* binding */ updateOneMovie)
/* harmony export */ });
/* harmony import */ var _prisma_client__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @prisma/client */ "@prisma/client");
/* harmony import */ var _prisma_client__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_prisma_client__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _utils_helpers_common_connectSchema__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../utils/helpers/common/connectSchema */ "./src/utils/helpers/common/connectSchema.js");
/* harmony import */ var _utils_errors_responseError__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../utils/errors/responseError */ "./src/utils/errors/responseError.js");
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }




const prisma = new _prisma_client__WEBPACK_IMPORTED_MODULE_0__.PrismaClient();
const updateOneMovie = async (req, res) => {
  let movieUpdated = null;
  const paramId = Number(req.params.id);
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
          create: (0,_utils_helpers_common_connectSchema__WEBPACK_IMPORTED_MODULE_1__.createConnectFormat)(genres?.conectar, "genero", "id"),
          deleteMany: (0,_utils_helpers_common_connectSchema__WEBPACK_IMPORTED_MODULE_1__.deleteRelationFormat)(genres?.desconectar, "idGenero", {
            idPelicula: paramId
          })
        },
        personajes: {
          create: (0,_utils_helpers_common_connectSchema__WEBPACK_IMPORTED_MODULE_1__.createConnectFormat)(characters?.conectar, "personaje", "id"),
          deleteMany: (0,_utils_helpers_common_connectSchema__WEBPACK_IMPORTED_MODULE_1__.deleteRelationFormat)(characters?.desconectar, "idPersonaje", {
            idPelicula: paramId
          })
        }
      })
    });
  } catch (error) {
    return res.status(500).send((0,_utils_errors_responseError__WEBPACK_IMPORTED_MODULE_2__.responseError)(`Error actualizando la pelicula con id=${paramId}`, error));
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

/***/ "./src/routes/authRoutes.js":
/*!**********************************!*\
  !*** ./src/routes/authRoutes.js ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! express */ "express");
/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(express__WEBPACK_IMPORTED_MODULE_0__);

const authRouter = express__WEBPACK_IMPORTED_MODULE_0___default().Router();
authRouter.get("/", (req, res) => {
  res.send("este es el auth");
});
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (authRouter);

/***/ }),

/***/ "./src/routes/charactersRoutes.js":
/*!****************************************!*\
  !*** ./src/routes/charactersRoutes.js ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! express */ "express");
/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(express__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _controller_characters_createCharacters__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../controller/characters/createCharacters */ "./src/controller/characters/createCharacters.js");
/* harmony import */ var _controller_characters_deleteCharacters__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../controller/characters/deleteCharacters */ "./src/controller/characters/deleteCharacters.js");
/* harmony import */ var _controller_characters_getCharacters__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../controller/characters/getCharacters */ "./src/controller/characters/getCharacters.js");
/* harmony import */ var _controller_characters_updateCharacters__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../controller/characters/updateCharacters */ "./src/controller/characters/updateCharacters.js");
/* harmony import */ var _utils_validations_characters_middleCharactersValidator__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../utils/validations/characters/middleCharactersValidator */ "./src/utils/validations/characters/middleCharactersValidator.js");






const characterRouter = express__WEBPACK_IMPORTED_MODULE_0___default().Router();
characterRouter.get("/", _controller_characters_getCharacters__WEBPACK_IMPORTED_MODULE_3__.getCharacterList);
characterRouter.get("/:id", _controller_characters_getCharacters__WEBPACK_IMPORTED_MODULE_3__.getOneCharacter);
characterRouter.post("/", _utils_validations_characters_middleCharactersValidator__WEBPACK_IMPORTED_MODULE_5__.middleCharactersValidator, _controller_characters_createCharacters__WEBPACK_IMPORTED_MODULE_1__.createNewCharacter);
characterRouter.put("/:id", _utils_validations_characters_middleCharactersValidator__WEBPACK_IMPORTED_MODULE_5__.middleCharactersValidator, _controller_characters_updateCharacters__WEBPACK_IMPORTED_MODULE_4__.updateOneCharacter);
characterRouter.delete("/:id", _controller_characters_deleteCharacters__WEBPACK_IMPORTED_MODULE_2__.deleteOneCharacter);
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (characterRouter);

/***/ }),

/***/ "./src/routes/genresRoutes.js":
/*!************************************!*\
  !*** ./src/routes/genresRoutes.js ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! express */ "express");
/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(express__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _controller_genres_createGenres__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../controller/genres/createGenres */ "./src/controller/genres/createGenres.js");
/* harmony import */ var _controller_genres_deleteGenres__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../controller/genres/deleteGenres */ "./src/controller/genres/deleteGenres.js");
/* harmony import */ var _controller_genres_getGenres__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../controller/genres/getGenres */ "./src/controller/genres/getGenres.js");
/* harmony import */ var _controller_genres_updateGenres__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../controller/genres/updateGenres */ "./src/controller/genres/updateGenres.js");
/* harmony import */ var _utils_validations_genres_middleGenresValidator__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../utils/validations/genres/middleGenresValidator */ "./src/utils/validations/genres/middleGenresValidator.js");






const genreRouter = express__WEBPACK_IMPORTED_MODULE_0___default().Router();
genreRouter.get("/", _controller_genres_getGenres__WEBPACK_IMPORTED_MODULE_3__.getGenreList);
genreRouter.get("/:id", _controller_genres_getGenres__WEBPACK_IMPORTED_MODULE_3__.getOneGenre);
genreRouter.post("/", _utils_validations_genres_middleGenresValidator__WEBPACK_IMPORTED_MODULE_5__.middleGenresValidator, _controller_genres_createGenres__WEBPACK_IMPORTED_MODULE_1__.createNewGenre);
genreRouter.put("/:id", _utils_validations_genres_middleGenresValidator__WEBPACK_IMPORTED_MODULE_5__.middleGenresValidator, _controller_genres_updateGenres__WEBPACK_IMPORTED_MODULE_4__.updateOneGenre);
genreRouter.delete("/:id", _controller_genres_deleteGenres__WEBPACK_IMPORTED_MODULE_2__.deleteOneGenre);
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (genreRouter);

/***/ }),

/***/ "./src/routes/moviesRoutes.js":
/*!************************************!*\
  !*** ./src/routes/moviesRoutes.js ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! express */ "express");
/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(express__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _controller_movies_createMovies__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../controller/movies/createMovies */ "./src/controller/movies/createMovies.js");
/* harmony import */ var _controller_movies_deleteMovies__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../controller/movies/deleteMovies */ "./src/controller/movies/deleteMovies.js");
/* harmony import */ var _controller_movies_getMovies__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../controller/movies/getMovies */ "./src/controller/movies/getMovies.js");
/* harmony import */ var _controller_movies_updateMovies__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../controller/movies/updateMovies */ "./src/controller/movies/updateMovies.js");
/* harmony import */ var _utils_validations_movies_middleMoviesValidator__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../utils/validations/movies/middleMoviesValidator */ "./src/utils/validations/movies/middleMoviesValidator.js");






const moviesRouter = express__WEBPACK_IMPORTED_MODULE_0___default().Router();
moviesRouter.get("/", _controller_movies_getMovies__WEBPACK_IMPORTED_MODULE_3__.getMoviesList);
moviesRouter.get("/:id", _controller_movies_getMovies__WEBPACK_IMPORTED_MODULE_3__.getOneMovie);
moviesRouter.post("/", _utils_validations_movies_middleMoviesValidator__WEBPACK_IMPORTED_MODULE_5__.middleMoviesValidator, _controller_movies_createMovies__WEBPACK_IMPORTED_MODULE_1__.createNewMovie);
moviesRouter.put("/:id", _utils_validations_movies_middleMoviesValidator__WEBPACK_IMPORTED_MODULE_5__.middleMoviesValidator, _controller_movies_updateMovies__WEBPACK_IMPORTED_MODULE_4__.updateOneMovie);
moviesRouter.delete("/:id", _controller_movies_deleteMovies__WEBPACK_IMPORTED_MODULE_2__.deleteOneMovie);
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (moviesRouter);

/***/ }),

/***/ "./src/routes/router.js":
/*!******************************!*\
  !*** ./src/routes/router.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! express */ "express");
/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(express__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _authRoutes__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./authRoutes */ "./src/routes/authRoutes.js");
/* harmony import */ var _charactersRoutes__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./charactersRoutes */ "./src/routes/charactersRoutes.js");
/* harmony import */ var _genresRoutes__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./genresRoutes */ "./src/routes/genresRoutes.js");
/* harmony import */ var _moviesRoutes__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./moviesRoutes */ "./src/routes/moviesRoutes.js");





const router = express__WEBPACK_IMPORTED_MODULE_0___default().Router();
router.use("/auth", _authRoutes__WEBPACK_IMPORTED_MODULE_1__["default"]);
router.use("/characters", _charactersRoutes__WEBPACK_IMPORTED_MODULE_2__["default"]);
router.use("/movies", _moviesRoutes__WEBPACK_IMPORTED_MODULE_4__["default"]);
router.use("/genres", _genresRoutes__WEBPACK_IMPORTED_MODULE_3__["default"]);
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (router);

/***/ }),

/***/ "./src/utils/errors/prismaErrorHandler.js":
/*!************************************************!*\
  !*** ./src/utils/errors/prismaErrorHandler.js ***!
  \************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "prismaErrorHandler": () => (/* binding */ prismaErrorHandler)
/* harmony export */ });
/* harmony import */ var _prisma_client__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @prisma/client */ "@prisma/client");
/* harmony import */ var _prisma_client__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_prisma_client__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _helpers_common_stringFormater__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../helpers/common/stringFormater */ "./src/utils/helpers/common/stringFormater.js");
/* harmony import */ var _typeErrors__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./typeErrors */ "./src/utils/errors/typeErrors.js");



const prismaErrorHandler = error => {
  if (error instanceof _prisma_client__WEBPACK_IMPORTED_MODULE_0__.Prisma.PrismaClientValidationError) {
    const errorTotalLength = JSON.stringify(error.message).length;
    const lastBracketFormat = JSON.stringify(error.message).lastIndexOf("}");
    error.message = JSON.stringify(error.message).substring(lastBracketFormat + 5, errorTotalLength - 5).split(/\\n\\n|\\n/);
    error.typeError = _typeErrors__WEBPACK_IMPORTED_MODULE_2__.typeError.PRISMA_VALIDATION;
  } else if (error instanceof _prisma_client__WEBPACK_IMPORTED_MODULE_0__.Prisma.PrismaClientInitializationError) {
    error.message = (0,_helpers_common_stringFormater__WEBPACK_IMPORTED_MODULE_1__.removeLineBreaks)(error.message);
    error.typeError = _typeErrors__WEBPACK_IMPORTED_MODULE_2__.typeError.PRISMA_CONNECTION;
  } else if (error instanceof _prisma_client__WEBPACK_IMPORTED_MODULE_0__.Prisma.PrismaClientKnownRequestError) {
    error.message = (0,_helpers_common_stringFormater__WEBPACK_IMPORTED_MODULE_1__.removeLineBreaks)(error.message);
    error.typeError = _typeErrors__WEBPACK_IMPORTED_MODULE_2__.typeError.PRISMA_DATABASE;
  }
};

/***/ }),

/***/ "./src/utils/errors/responseError.js":
/*!*******************************************!*\
  !*** ./src/utils/errors/responseError.js ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "responseError": () => (/* binding */ responseError)
/* harmony export */ });
/* harmony import */ var _prismaErrorHandler__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./prismaErrorHandler */ "./src/utils/errors/prismaErrorHandler.js");
/* harmony import */ var _runTimeErrorHandler__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./runTimeErrorHandler */ "./src/utils/errors/runTimeErrorHandler.js");
/* harmony import */ var _typeErrors__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./typeErrors */ "./src/utils/errors/typeErrors.js");



const responseError = (message, error) => {
  (0,_prismaErrorHandler__WEBPACK_IMPORTED_MODULE_0__.prismaErrorHandler)(error);
  (0,_runTimeErrorHandler__WEBPACK_IMPORTED_MODULE_1__.javascriptRuntimeErrorHandler)(error);

  if (!error.typeError) {
    error.typeError = _typeErrors__WEBPACK_IMPORTED_MODULE_2__.typeError.UNIDENTIFIED;
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

/***/ "./src/utils/errors/runTimeErrorHandler.js":
/*!*************************************************!*\
  !*** ./src/utils/errors/runTimeErrorHandler.js ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "javascriptRuntimeErrorHandler": () => (/* binding */ javascriptRuntimeErrorHandler)
/* harmony export */ });
/* harmony import */ var _typeErrors__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./typeErrors */ "./src/utils/errors/typeErrors.js");

const javascriptRuntimeErrorHandler = error => {
  if (error instanceof ReferenceError) {
    error.typeError = _typeErrors__WEBPACK_IMPORTED_MODULE_0__.typeError.JAVASCRIPT_ERROR;
  }
};

/***/ }),

/***/ "./src/utils/errors/typeErrors.js":
/*!****************************************!*\
  !*** ./src/utils/errors/typeErrors.js ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "typeError": () => (/* binding */ typeError)
/* harmony export */ });
const typeError = {
  UNIDENTIFIED: "UNIDENTIFIED",
  DATABASE: "DATABASE",
  PRISMA_CONNECTION: "PRISMA CONNECTION ERROR",
  PRISMA_VALIDATION: "PRISMA INVALID FIELDS",
  PRISMA_DATABASE: "PRISMA DATABASE INVALID ACTION",
  JAVASCRIPT_ERROR: "JAVASCRIPT RUNTIME ERROR",
  EMPTY_BODY: "EMPTY_BODY",
  BAD_INPUT_DATA: "BAD_INPUT_DATA"
};

/***/ }),

/***/ "./src/utils/helpers/common/connectSchema.js":
/*!***************************************************!*\
  !*** ./src/utils/helpers/common/connectSchema.js ***!
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

/***/ "./src/utils/helpers/common/dateConverter.js":
/*!***************************************************!*\
  !*** ./src/utils/helpers/common/dateConverter.js ***!
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

/***/ "./src/utils/helpers/common/imageSetter.js":
/*!*************************************************!*\
  !*** ./src/utils/helpers/common/imageSetter.js ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "setDefaultImage": () => (/* binding */ setDefaultImage)
/* harmony export */ });
const setDefaultImage = (req, field) => {
  if (req.body[field] === undefined || null) {
    req.body[field] = "https://whetstonefire.org/wp-content/uploads/2020/06/image-not-available.jpg";
  }
};

/***/ }),

/***/ "./src/utils/helpers/common/stringFormater.js":
/*!****************************************************!*\
  !*** ./src/utils/helpers/common/stringFormater.js ***!
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

/***/ "./src/utils/validations/characters/middleCharactersValidator.js":
/*!***********************************************************************!*\
  !*** ./src/utils/validations/characters/middleCharactersValidator.js ***!
  \***********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "middleCharactersValidator": () => (/* binding */ middleCharactersValidator)
/* harmony export */ });
/* harmony import */ var _common_reqBodyEmpty__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../common/reqBodyEmpty */ "./src/utils/validations/common/reqBodyEmpty.js");
/* harmony import */ var _common_validations__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../common/validations */ "./src/utils/validations/common/validations.js");


const middleCharactersValidator = (req, res, next) => {
  if ((0,_common_validations__WEBPACK_IMPORTED_MODULE_1__.validations)(_common_reqBodyEmpty__WEBPACK_IMPORTED_MODULE_0__.isNotEmptyBody.bind(null, req, res))) {
    next();
  }
};

/***/ }),

/***/ "./src/utils/validations/common/dates.js":
/*!***********************************************!*\
  !*** ./src/utils/validations/common/dates.js ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "checkDateLimits": () => (/* binding */ checkDateLimits)
/* harmony export */ });
/* harmony import */ var _errors_typeErrors__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../errors/typeErrors */ "./src/utils/errors/typeErrors.js");
/* harmony import */ var _helpers_common_dateConverter__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../helpers/common/dateConverter */ "./src/utils/helpers/common/dateConverter.js");


const checkDateLimits = (req, res) => {
  let result = false;
  const {
    year,
    month,
    day
  } = (0,_helpers_common_dateConverter__WEBPACK_IMPORTED_MODULE_1__.stringToNumberDateValues)(req.body.fecha_creacion);

  if (month > 11 || month < 0) {
    res.status(400).send({
      error: {
        messageError: "Ha ocurrido en error al introducir el mes",
        typeError: _errors_typeErrors__WEBPACK_IMPORTED_MODULE_0__.typeError.BAD_INPUT_DATA,
        systemError: null
      }
    });
    return result;
  }

  if (day > new Date(year, month, 0).getDate()) {
    res.status(400).send({
      error: {
        messageError: "Ha ocurrido en error al introducir el dia",
        typeError: _errors_typeErrors__WEBPACK_IMPORTED_MODULE_0__.typeError.BAD_INPUT_DATA,
        systemError: null
      }
    });
    return result;
  }

  result = true;
  return result;
};

/***/ }),

/***/ "./src/utils/validations/common/reqBodyEmpty.js":
/*!******************************************************!*\
  !*** ./src/utils/validations/common/reqBodyEmpty.js ***!
  \******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "isNotEmptyBody": () => (/* binding */ isNotEmptyBody)
/* harmony export */ });
/* harmony import */ var _errors_typeErrors__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../errors/typeErrors */ "./src/utils/errors/typeErrors.js");

const isNotEmptyBody = (req, res) => {
  if (Object.keys(req.body).length === 0) {
    res.status(400).send({
      error: {
        messageError: "Cuerpo de peticion vacio",
        typeError: _errors_typeErrors__WEBPACK_IMPORTED_MODULE_0__.typeError.BAD_INPUT_DATA,
        systemError: null
      }
    });
    return false;
  }

  return true;
};

/***/ }),

/***/ "./src/utils/validations/common/validations.js":
/*!*****************************************************!*\
  !*** ./src/utils/validations/common/validations.js ***!
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

/***/ "./src/utils/validations/genres/middleGenresValidator.js":
/*!***************************************************************!*\
  !*** ./src/utils/validations/genres/middleGenresValidator.js ***!
  \***************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "middleGenresValidator": () => (/* binding */ middleGenresValidator)
/* harmony export */ });
/* harmony import */ var _common_reqBodyEmpty__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../common/reqBodyEmpty */ "./src/utils/validations/common/reqBodyEmpty.js");
/* harmony import */ var _common_validations__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../common/validations */ "./src/utils/validations/common/validations.js");


const middleGenresValidator = (req, res, next) => {
  if ((0,_common_validations__WEBPACK_IMPORTED_MODULE_1__.validations)(_common_reqBodyEmpty__WEBPACK_IMPORTED_MODULE_0__.isNotEmptyBody.bind(null, req, res))) {
    next();
  }
};

/***/ }),

/***/ "./src/utils/validations/movies/attributeChecker.js":
/*!**********************************************************!*\
  !*** ./src/utils/validations/movies/attributeChecker.js ***!
  \**********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "checkQualification": () => (/* binding */ checkQualification)
/* harmony export */ });
/* harmony import */ var _errors_typeErrors__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../errors/typeErrors */ "./src/utils/errors/typeErrors.js");

const checkQualification = (req, res) => {
  if (req.body.calificacion < 1 || req.body.calificacion > 5) {
    res.status(400).send({
      error: {
        messageError: "Calificacion de pelicula por fuera de limites (1-5)",
        typeError: _errors_typeErrors__WEBPACK_IMPORTED_MODULE_0__.typeError.BAD_INPUT_DATA,
        systemError: null
      }
    });
    return false;
  }

  return true;
};

/***/ }),

/***/ "./src/utils/validations/movies/middleMoviesValidator.js":
/*!***************************************************************!*\
  !*** ./src/utils/validations/movies/middleMoviesValidator.js ***!
  \***************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "middleMoviesValidator": () => (/* binding */ middleMoviesValidator)
/* harmony export */ });
/* harmony import */ var _common_dates__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../common/dates */ "./src/utils/validations/common/dates.js");
/* harmony import */ var _common_reqBodyEmpty__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../common/reqBodyEmpty */ "./src/utils/validations/common/reqBodyEmpty.js");
/* harmony import */ var _common_validations__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../common/validations */ "./src/utils/validations/common/validations.js");
/* harmony import */ var _attributeChecker__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./attributeChecker */ "./src/utils/validations/movies/attributeChecker.js");




const middleMoviesValidator = (req, res, next) => {
  if ((0,_common_validations__WEBPACK_IMPORTED_MODULE_2__.validations)(_common_reqBodyEmpty__WEBPACK_IMPORTED_MODULE_1__.isNotEmptyBody.bind(null, req, res), _attributeChecker__WEBPACK_IMPORTED_MODULE_3__.checkQualification.bind(null, req, res), _common_dates__WEBPACK_IMPORTED_MODULE_0__.checkDateLimits.bind(null, req, res))) {
    next();
  }
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
/* harmony import */ var _src_routes_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./src/routes/router */ "./src/routes/router.js");
/* harmony import */ var dotenv__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! dotenv */ "dotenv");
/* harmony import */ var dotenv__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(dotenv__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var path__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! path */ "path");
/* harmony import */ var path__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(path__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var consolidate__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! consolidate */ "consolidate");
/* harmony import */ var consolidate__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(consolidate__WEBPACK_IMPORTED_MODULE_4__);





dotenv__WEBPACK_IMPORTED_MODULE_2___default().config();
const port = process.env.PORT || 3000;
const app = express__WEBPACK_IMPORTED_MODULE_0___default()();
app.set('views', path__WEBPACK_IMPORTED_MODULE_3___default().join(__dirname + '/views'));
app.engine('html', (consolidate__WEBPACK_IMPORTED_MODULE_4___default().mustache));
app.set('view engine', 'html');
app.use(express__WEBPACK_IMPORTED_MODULE_0___default().json());
app.get("/", (req, res) => {
  res.render("index.html");
});
app.use(_src_routes_router__WEBPACK_IMPORTED_MODULE_1__["default"]);
app.listen(port, () => {
  console.log(`Servidor Funcionando en puerto: ${port}`);
});
})();

/******/ })()
;
//# sourceMappingURL=app.js.map