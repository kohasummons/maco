module.exports = (mongoose) => {
  const Collection = mongoose.model(
    "collection",
    mongoose.Schema(
      {
        title: String,
        description: String,
        published: Boolean,
      },
      { timestamps: true }
    )
  );

  return Collection;
};



// Modified to replace __id with id;
// module.exports = (mongoose) => {
//   var schema = mongoose.Schema(
//     {
//       title: String,
//       description: String,
//       published: Boolean,
//     },
//     { timestamps: true }
//   );

//   schema.method("toJSON", () => {
//       const { __v, _id, ...object} = this.toObject();
//       object.id = _id;
//       return object;
//   })

//   const Collection = mongoose.model("collection", schema);
//   return collections;
// };
