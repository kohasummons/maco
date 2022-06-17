let isGod = false;

const whoDidIt = new Promise((resolve, reject) => {
  if (isGod) {
    const miracle = "Raise the comet field! God did it";
    resolve(miracle);
  } else {
    const why = "buy some chilled zobo while you wait";
    reject(why);
  }
});

const testify = () => {
  whoDidIt
    .then((ok) => {
      console.log(ok);
    })
    .catch((err) => {
      console.error(err);
    });
};

testify();