"use strict";

var _express = _interopRequireDefault(require("express"));

var _router = _interopRequireDefault(require("./src/routes/router"));

var _dotenv = _interopRequireDefault(require("dotenv"));

var _path = _interopRequireDefault(require("path"));

var _consolidate = _interopRequireDefault(require("consolidate"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_dotenv.default.config();

const port = process.env.PORT || 3000;
const app = (0, _express.default)();
app.set('views', _path.default.join(__dirname + '/views'));
app.engine('html', _consolidate.default.mustache);
app.set('view engine', 'html');
app.use(_express.default.json());
app.get("/", (req, res) => {
  res.render("index.html");
});
app.use(_router.default);
app.listen(port, () => {
  console.log(`Servidor Funcionando en puerto: ${port}`);
});