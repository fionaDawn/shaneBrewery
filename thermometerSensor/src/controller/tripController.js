var Trip = require("../services/tripService");
var View = require("../views/tripView");
require("dotenv").config();
var timer;
const startTrip = (req, res) => {
  const body = req.body;

  Trip.startTrip(body)
    .then(r => {
      console.log(r);
      if (r.status === 200) {
        // randomly pick IDs from this trip to update temperature
        const interval = 2000 || process.env.RANDOMIZER_INTERVAL;
        timer = setInterval(async () => {
          const maxIndex = 14;
          const containerId = Math.floor(Math.random() * maxIndex + 1);
          Trip.updateContainerTemp(containerId).catch(e => {
            clearInterval(timer);
          });
        }, interval);
        View.success(res);
      } else View.resp(res, r);
    })
    .catch(_e => {
      View.fail(res);
    });
};

const stopTrip = (_req, res) => {
  try {
    clearInterval(timer);
    Trip.stopTrip()
      .then(_r => {
        View.successNoResponse(res);
      })
      .catch(e => {
        View.fail(res);
      });
  } catch (e) {
    View.fail(res);
  }
};

module.exports = {
  startTrip,
  stopTrip
};
