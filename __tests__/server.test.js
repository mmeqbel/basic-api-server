/*
Assert the following
404 on a bad route
404 on a bad method
The correct status codes and returned data for each REST route
Create a record using POST
Read a list of records using GET
Read a record using GET
Update a record using PUT
Destroy a record using DELETE
*/
'use strict';
const superTest = require('supertest');
const server = require('../src/server.js');
const request = superTest(server.server);
let foodId;
let clothesId;


describe('Server', () => {
  it('404 on a bad route', async () => {
    const response = await request.get('/api/v1/foo');
    expect(response.status).toEqual(404);//404 on a bad route
  });
  it('404 on a bad method', async () => {
    const response = await request.post('/api/v1/foo');
    expect(response.status).toEqual(404);//404 on a bad method
  });
  
  it('The correct status codes and returned data for get /food', async () => {
    const response = await request.get('/api/v1/food');
    expect(response.status).toEqual(200);
    expect(typeof JSON.parse(response.text)).toEqual(typeof []);
  });
  it('The correct status codes and returned data for get /clothes', async () => {
    const response = await request.get('/api/v1/food');
    expect(response.status).toEqual(200);
    expect(typeof JSON.parse(response.text)).toEqual(typeof []);
  });

  it('The correct status codes and returned data for post /food', async () => {
    const response = await request.post('/api/v1/food').send({type:"jordanian"}); //send()==body
    expect(response.status).toEqual(201);
    expect(response.body.data.type).toEqual("jordanian");
    foodId=response.body.id;
  });
  it('The correct status codes and returned data for post /clothes', async () => {
    const response = await request.post('/api/v1/clothes').send({type:"jacket"});
    expect(response.status).toEqual(201);
    expect(response.body.data.type).toEqual("jacket");
    clothesId=response.body.id;
  });

  it('The correct status codes and returned data for put /food', async () => {
    const response = await request.put('/api/v1/food') //put with no id
    expect(response.status).toEqual(404);
  });
  it('The correct status codes and returned data for put /clothes', async () => {
    const response = await request.put('/api/v1/food') //put with no id
    expect(response.status).toEqual(404);
  });

  it('The correct status codes and returned data for put /food', async () => {
    const response = await request.put(`/api/v1/food/${foodId}`).send({type:"chinees"}) //put with  id and data
    expect(response.status).toEqual(200);
    expect(response.body.data.type).toEqual("chinees");
  });
  it('The correct status codes and returned data for put /clothes', async () => {
    const response = await request.put(`/api/v1/clothes/${clothesId}`).send({type:"dress"}) //put with  id and data
    expect(response.status).toEqual(200);
    expect(response.body.data.type).toEqual("dress");
  });

  it('The correct status codes and returned data for delete /food', async () => {
    const response = await request.delete(`/api/v1/food/${foodId}`) //delete
    expect(response.status).toEqual(200);
    expect(response.body).toEqual(null);

  });
  it('The correct status codes and returned data for delete /clothes', async () => {
    const response = await request.delete(`/api/v1/clothes/${clothesId}`).send({type:"dress"}) //delete
    expect(response.status).toEqual(200);
    expect(response.body).toEqual(null);
  });



});