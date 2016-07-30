const supertest = require('supertest')
    , index     = require('../../index');

exports.add_expenses_route_should_exist = function(done) {
  supertest(index)
    .post('/v1/api/expenses/')
    .expect((res) => {
      console.log(res.status);
      if (!res) throw new Error("route does not exist!");
    })
    .end(done);
};
