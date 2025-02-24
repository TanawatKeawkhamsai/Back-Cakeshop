const express = require('express');
const Sequelize = require('sequelize');
const app = express();
app.use(express.json());

const sequelize = new Sequelize("database", "username", "password", {
    host: "localhost",
    dialect: "sqlite",
    storage: "./Database/CakeShop.sqlite",
  });

const Cake = sequelize.define("Cake", {
    cake_id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    cake_name: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    cake_price: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    cake_size: {
        type: Sequelize.STRING,
        allowNull: false,
    },
  });

const Customer = sequelize.define("Customer", {
    customer_id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    customer_username: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    customer_password: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },
    Address: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    email: {
      type: Sequelize.STRING,
      allowNull: false,
    },
  });

const Employee = sequelize.define("Employee", {
    employee_id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    employee_username: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    employee_password: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },
    phone: {
      type: Sequelize.STRING,
      allowNull: false,
    }
  });

const Order = sequelize.define("Order", {
    order_id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    order_date: {
      type: Sequelize.DATE,
      allowNull: false,
    },
    Status: {
      type: Sequelize.STRING,
      allowNull: false,
    }
  });

const Order_Detail = sequelize.define("Order_Detail", {
    order_detail_id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    order_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    cake_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },
    employee_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },
    customer_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },
    Quantity: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    total_price: {
      type: Sequelize.INTEGER,
      allowNull: false,
    }
  });

sequelize.sync();

//---------------------------Table_Cake---------------------------------
app.get("/Cake", (req, res) => {
  Cake.findAll()
    .then((Cake) => {
      res.json(Cake);
    })
    .catch((err) => {
      res.status(500).send(err);
    });
});

app.get("/Cake/:id", (req, res) => {
  Cake.findByPk(req.params.id)
    .then((Cake) => {
      if (!Cake) {
        res.status(404).send("Cake not found");
      } else {
        res.json(Cake);
      }
    })
    .catch((err) => {
      res.status(500).send(err);
    });
});

app.post("/Cakes", (req, res) => {
  Cake.create(req.body)
    .then((Cake) => {
      res.send(Cake);
    })
    .catch((err) => {
      res.status(500).send(err);
    });
});

app.put("/Cake/:id", (req, res) => {
  Cake.findByPk(req.params.id)
    .then((Cake) => {
      if (!Cake) {
        res.status(404).send("Cake not found");
      } else {
        Cake.update(req.body)
          .then(() => {
            res.send(Cake);
          })
          .catch((err) => {
            res.status(500).send(err);
          });
      }
    })
    .catch((err) => {
      res.status(500).send(err);
    });
});

app.delete("/Cake/:id", (req, res) => {
  Cake.findByPk(req.params.id)
    .then((Cake) => {
      if (!Cake) {
        res.status(404).send("Cake not found");
      } else {
        Cake.destroy()
          .then(() => {
            res.send({});
          })
          .catch((err) => {
            res.status(500).send(err);
          });
      }
    })
    .catch((err) => {
      res.status(500).send(err);
    });
});

//---------------------------Table_Customer---------------------------------
app.get("/Customer", (req, res) => {
    Customer.findAll()
      .then((Customer) => {
        res.json(Customer);
      })
      .catch((err) => {
        res.status(500).send(err);
      });
  });

app.get("/Customer/:id", (req, res) => {
  Customer.findByPk(req.params.id)
    .then((Customer) => {
      if (!Customer) {
        res.status(404).send("Customer not found");
      } else {
        res.json(Cake);
      }
    })
    .catch((err) => {
      res.status(500).send(err);
    });
});

app.post("/Customers", (req, res) => {
    Customer.create(req.body)
      .then((Customer) => {
        res.send(Customer);
      })
      .catch((err) => {
        res.status(500).send(err);
      });
  });

  app.put("/Customer/:id", (req, res) => {
    Customer.findByPk(req.params.id)
      .then((Customer) => {
        if (!Customer) {
          res.status(404).send("Customer not found");
        } else {
            Customer.update(req.body)
            .then(() => {
              res.send(Customer);
            })
            .catch((err) => {
              res.status(500).send(err);
            });
        }
      })
      .catch((err) => {
        res.status(500).send(err);
      });
  });

  app.delete("/Customer/:id", (req, res) => {
    Customer.findByPk(req.params.id)
      .then((Customer) => {
        if (!Customer) {
          res.status(404).send("Customer not found");
        } else {
            Customer.destroy()
            .then(() => {
              res.send({});
            })
            .catch((err) => {
              res.status(500).send(err);
            });
        }
      })
      .catch((err) => {
        res.status(500).send(err);
      });
  });

//---------------------------Table_Employee---------------------------------
app.get("/Employee", (req, res) => {
    Employee.findAll()
      .then((Employee) => {
        res.json(Employee);
      })
      .catch((err) => {
        res.status(500).send(err);
      });
});

app.get("/Employee/:id", (req, res) => {
    Employee.findByPk(req.params.id)
      .then((Employee) => {
        if (!Employee) {
          res.status(404).send("Employee not found");
        } else {
          res.json(Employee);
        }
      })
      .catch((err) => {
        res.status(500).send(err);
      });
});

app.post("/Employees", (req, res) => {
    Employee.create(req.body)
      .then((Employee) => {
        res.send(Employee);
      })
      .catch((err) => {
        res.status(500).send(err);
      });
});

app.put("/Employee/:id", (req, res) => {
    Employee.findByPk(req.params.id)
      .then((Employee) => {
        if (!Employee) {
          res.status(404).send("Employee not found");
        } else {
            Employee.update(req.body)
            .then(() => {
              res.send(Employee);
            })
            .catch((err) => {
              res.status(500).send(err);
            });
        }
      })
      .catch((err) => {
        res.status(500).send(err);
      });
});

app.delete("/Employee/:id", (req, res) => {
    Employee.findByPk(req.params.id)
      .then((Employee) => {
        if (!Employee) {
          res.status(404).send("Employee not found");
        } else {
            Employee.destroy()
            .then(() => {
              res.send({});
            })
            .catch((err) => {
              res.status(500).send(err);
            });
        }
      })
      .catch((err) => {
        res.status(500).send(err);
      });
});

//---------------------------Table_Order---------------------------------
app.get("/Order", (req, res) => {
    Order.findAll()
      .then((Order) => {
        res.json(Order);
      })
      .catch((err) => {
        res.status(500).send(err);
      });
});

app.get("/Order/:id", (req, res) => {
    Order.findByPk(req.params.id)
      .then((Order) => {
        if (!Order) {
          res.status(404).send("Order not found");
        } else {
          res.json(Order);
        }
      })
      .catch((err) => {
        res.status(500).send(err);
      });
});

app.post("/Orders", (req, res) => {
    Order.create(req.body)
      .then((Order) => {
        res.send(Order);
      })
      .catch((err) => {
        res.status(500).send(err);
      });
});

app.put("/Order/:id", (req, res) => {
    Order.findByPk(req.params.id)
      .then((Order) => {
        if (!Order) {
          res.status(404).send("Order not found");
        } else {
            Order.update(req.body)
            .then(() => {
              res.send(Order);
            })
            .catch((err) => {
              res.status(500).send(err);
            });
        }
      })
      .catch((err) => {
        res.status(500).send(err);
      });
});

app.delete("/Order/:id", (req, res) => {
    Order.findByPk(req.params.id)
      .then((Order) => {
        if (!Order) {
          res.status(404).send("Order not found");
        } else {
            Order.destroy()
            .then(() => {
              res.send({});
            })
            .catch((err) => {
              res.status(500).send(err);
            });
        }
      })
      .catch((err) => {
        res.status(500).send(err);
      });
});

//---------------------------Table_Order_detail---------------------------------

app.get("/Order_Detail", (req, res) => {
    Order_Detail.findAll()
      .then((Order_Detail) => {
        res.json(Order_Detail);
      })
      .catch((err) => {
        res.status(500).send(err);
      });
});

app.get("/Order_detail/:id", (req, res) => {
    Order_detail.findByPk(req.params.id)
      .then((Order_detail) => {
        if (!Order_detail) {
          res.status(404).send("Order_detail not found");
        } else {
          res.json(Order_detail);
        }
      })
      .catch((err) => {
        res.status(500).send(err);
      });
});

app.post("/Order_details", (req, res) => {
  Order_detail.create(req.body)
      .then((Order_detail) => {
        res.send(Order_detail);
      })
      .catch((err) => {
        res.status(500).send(err);
      });
});

app.put("/Order_detail/:id", (req, res) => {
    Order_detail.findByPk(req.params.id)
      .then((Order_detail) => {
        if (!Order_detail) {
          res.status(404).send("Order_detail not found");
        } else {
            Order_detail.update(req.body)
            .then(() => {
              res.send(Order_detail);
            })
            .catch((err) => {
              res.status(500).send(err);
            });
        }
      })
      .catch((err) => {
        res.status(500).send(err);
      });
});

app.delete("/Order_detail/:id", (req, res) => {
    Order_detail.findByPk(req.params.id)
      .then((Order_detail) => {
        if (!Order_detail) {
          res.status(404).send("Order_detail not found");
        } else {
            Order_detail.destroy()
            .then(() => {
              res.send({});
            })
            .catch((err) => {
              res.status(500).send(err);
            });
        }
      })
      .catch((err) => {
        res.status(500).send(err);
      });
});


const port = process.env.PORT || 3000;
app.listen(port,() => console.log(`Example app listening at http://localhost:${port}`));