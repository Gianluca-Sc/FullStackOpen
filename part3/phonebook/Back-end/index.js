const express = require("express");
const app = express();
const morgan = require("morgan");
const cors = require("cors");
const Person = require("./models/person");

const unknownEndpoint = (_request, response) => {
  response.status(404).send({ error: "unknown endpoint" });
};

const errorHandler = (error, _req, res, next) => {
  console.error(error.message);

  if (error.name === "CastError") {
    return res.status(400).send({ error: "malformatted id" });
  } else if (error.name === "ValidationError") {
    return res.status(400).json({ error: error.message });
  }

  next(error);
};

morgan.token("body", (req) => {
  return JSON.stringify(req.body);
});

app.use(express.static("build"));
app.use(express.json());
app.use(cors());
app.use(
  morgan(":method :url :status :res[content-length] - :response-time ms :body")
);

app.get("/", (_req, res) => res.send("Hello World!"));

app.get("/info", (_req, res) => {
  Person.count({})
    .then((count) => {
      const time = new Date();
      const message = `<p>Phonebook has info for ${count} people</p><p>${time.toUTCString()}</p>`;

      res.send(message);
    })
    .catch((error) => console.log(error));
});

app.get("/api/persons", (_req, res) => {
  Person.find({}).then((persons) => {
    res.json(persons);
  });
});

app.post("/api/persons", (req, res, next) => {
  const { name, number } = req.body;

  if (!name || !number)
    return res.status(400).json({ error: "missing required field(s)" });

  const person = new Person({ name, number });
  person
    .save()
    .then((savedperson) => {
      res.json(savedperson);
    })
    .catch((error) => next(error));
});

app.get("/api/persons/:id", (req, res, next) => {
  const id = req.params.id;
  Person.findById(id)
    .then((person) => {
      if (person) {
        return res.json(person);
      } else {
        return res.status(404).end();
      }
    })
    .catch((error) => next(error));
});

app.put("/api/persons/:id", (req, res, next) => {
  const id = req.params.id;
  const { name, number } = req.body;

  const person = { name, number };
  console.log(person);
  Person.findByIdAndUpdate(id, person, {
    new: true,
    runValidators: true,
    context: "query",
  })
    .then((updatedperson) => {
      if (updatedperson === null) return res.status(404).end();
      res.json(updatedperson);
    })
    .catch((error) => {
      next(error);
    });
});

app.delete("/api/persons/:id", (req, res, next) => {
  const id = req.params.id;
  Person.findByIdAndDelete(id)
    .then(() => res.status(204).end())
    .catch((error) => next(error));
});

app.use(unknownEndpoint);

app.use(errorHandler);

const port = process.env.PORT || 3001;
app.listen(port, () => console.log(`App listening on port ${port}!`));
