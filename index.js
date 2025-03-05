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
    cake_status: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    img: {
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
    position: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    img: {
      type: Sequelize.STRING,
      allowNull: false,
    },
  });

const Order_Detail = sequelize.define("Order_Detail", {
    order_detail_id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
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
    store_id: {
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

  const Store = sequelize.define("Store", {
    store_id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    store_name: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    store_address: {
        type: Sequelize.STRING,
        allowNull: false,
    },
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
        res.json(Customer);
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

//---------------------------Table_Store---------------------------------
app.get("/Store", (req, res) => {
  Store.findAll()
      .then((Store) => {
        res.json(Store);
      })
      .catch((err) => {
        res.status(500).send(err);
      });
});

app.get("/Store/:id", (req, res) => {
    Store.findByPk(req.params.id)
      .then((Store) => {
        if (!Store) {
          res.status(404).send("Store not found");
        } else {
          res.json(Store);
        }
      })
      .catch((err) => {
        res.status(500).send(err);
      });
});

app.post("/Stores", (req, res) => {
    Store.create(req.body)
      .then((Store) => {
        res.send(Store);
      })
      .catch((err) => {
        res.status(500).send(err);
      });
});

app.put("/Store/:id", (req, res) => {
    Store.findByPk(req.params.id)
      .then((Store) => {
        if (!Store) {
          res.status(404).send("Store not found");
        } else {
          Store.update(req.body)
            .then(() => {
              res.send(Store);
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

app.delete("/Store/:id", (req, res) => {
  Store.findByPk(req.params.id)
      .then((Store) => {
        if (!Store) {
          res.status(404).send("Store not found");
        } else {
          Store.destroy()
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
//---------------------------connect Front---------------------------------

// Register
app.get("/register", (req, res) => {
  Customer.findAll() //select * from
    .then((Register) => {
      res.json(Register);
    })
    .catch((err) => {
      res.status(500).send(err);
    });
});

app.post("/register", async (req, res) => {
  console.log(req.body);
  Customer.create(req.body)
    .then((Customer) => {
      res.send(Customer);
    })
    .catch((err) => {
      res.status(500).send(err);
    });
});

//login
app.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;

    // ตรวจสอบในตาราง Customer
    const customer = await Customer.findOne({ where: { customer_username: username } });
    if (customer) {
        if (customer.customer_password !== password) {
            return res.json({ message: "Wrong_Password" });
        }
        return res.status(200).json({ message: true, role: "customer", user: customer });
    }

    // ตรวจสอบในตาราง Employee
    const employee = await Employee.findOne({ where: { employee_username: username } });
    if (employee) {
        if (employee.employee_password !== password) {
            return res.json({ message: "Wrong_Password" });
        }
        return res.status(200).json({ message: true, role: "employee", user: employee });
    }

    // ถ้าไม่มีทั้งใน Customer และ Employee
    return res.json({ message: "User_not_found" });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Server_error" });
    }
});

//menu_customer
app.get("/menu_customer", async (req, res) => {
  try {
    const cakes = await Cake.findAll();
    console.log("🔥 Cakes Data:", cakes); // เช็คว่ามีข้อมูลไหม
    res.render("menu_customer", { cakes }); // ส่งไปให้ EJS
  } catch (err) {
    console.error("❌ Error fetching cakes:", err);
    res.status(500).send("Internal Server Error");
  }
});



const port = process.env.PORT || 3000;
app.listen(port,() => console.log(`Example app listening at http://localhost:${port}`));