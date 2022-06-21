import * as chai from 'chai';
import { after, before, it } from 'mocha';

import * as server from '../server';
import { Environment } from '../config/secrets';
import { PageModel } from '../models/page';
import chaiHttp = require('chai-http');

process.env.NODE_ENV = Environment.Test;

const expect = chai.expect;
chai.use(chaiHttp);

describe('GET /pages', () => {
  const pages = [{
    text: 'Robert Kiyosaki',
    pageNr: 1
  },
    {
      text: 'Sharon Lechter',
      pageNr: 2
    }];

  before(async function() {
    await PageModel.deleteMany({});
    await PageModel.insertMany(pages);
  });

  after(async function() {
    await PageModel.deleteMany({});
  });

  it('should get all pages', async function() {
    const res = await chai
      .request(server)
      .get('/api/v1/pages');
    expect(res.status).to.equal(200);
    expect(res.body.pages).to.be.a('array');
  });

  it('should create a new page', async function() {
    const mockDocument = {
      text: 'A new page',
      pageNr: 3
    };
    const res = await chai
      .request(server)
      .post('/api/v1/pages')
      .send(mockDocument);
    expect(res.status).to.equal(201);
    expect(res.body).to.be.a('object');
  });

});
