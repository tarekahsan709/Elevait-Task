import * as chai from "chai";
import { after, before, it } from "mocha";
import chaiHttp = require("chai-http");

import * as server from "../server";
import { Environment } from "../config/secrets";
import { DocumentModel } from "../models/document";

process.env.NODE_ENV = Environment.Test;

const expect = chai.expect;
chai.use(chaiHttp);

describe("GET /documents", () => {
  const documents = [{
    title: "Rich Dad Poor Dad",
    author: "Robert Kiyosaki and Sharon Lechter",
    pages: []
  },
    {
      title: "Batman",
      author: "DC Comics",
      pages: []
    }];

  before(async function() {
    await DocumentModel.deleteMany({});
    await DocumentModel.insertMany(documents);
  });

  after(async function() {
    await DocumentModel.deleteMany({});
  });

  it("should get all documents", async function() {
    const res = await chai
      .request(server)
      .get("/api/v1/documents");
    expect(res.status).to.equal(200);
    expect(res.body.docs).to.be.a("array");
  });

  it("should create a new document", async function() {
    const mockDocument = {
      title: "Rich Dad Poor Dad",
      author: "Robert Kiyosaki and Sharon Lechter",
      pages: []
    };
    const res = await chai
      .request(server)
      .post("/api/v1/documents")
      .send(mockDocument);
    expect(res.status).to.equal(201);
    expect(res.body).to.be.a("object");
  });

});
