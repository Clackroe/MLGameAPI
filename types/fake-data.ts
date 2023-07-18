import {  } from '@prisma/client';
import { faker } from '@faker-js/faker';



export function fakematch() {
  return {
    type: faker.lorem.words(5),
    timestamp: faker.datatype.datetime(),
    team_1_score: faker.datatype.number(),
    team_2_score: faker.datatype.number(),
  };
}
export function fakematchComplete() {
  return {
    id: faker.datatype.uuid(),
    team_1: faker.datatype.uuid(),
    team_1_model: faker.datatype.uuid(),
    team_2: faker.datatype.uuid(),
    team_2_model: faker.datatype.uuid(),
    type: faker.lorem.words(5),
    timestamp: faker.datatype.datetime(),
    team_1_score: faker.datatype.number(),
    team_2_score: faker.datatype.number(),
    winning_team_id: faker.datatype.uuid(),
    winning_model_id: faker.datatype.uuid(),
  };
}
export function fakemodel() {
  return {
    name: faker.name.fullName(),
    url: faker.lorem.words(5),
  };
}
export function fakemodelComplete() {
  return {
    id: faker.datatype.uuid(),
    team_id: faker.datatype.uuid(),
    name: faker.name.fullName(),
    url: faker.lorem.words(5),
  };
}
export function faketeam() {
  return {
    players: faker.lorem.words(5).split(' '),
  };
}
export function faketeamComplete() {
  return {
    id: faker.datatype.uuid(),
    players: faker.lorem.words(5).split(' '),
  };
}
export function fakeuser() {
  return {
    discord_id: faker.lorem.words(5),
    epic_id: faker.lorem.words(5),
    name: faker.name.fullName(),
  };
}
export function fakeuserComplete() {
  return {
    id: faker.datatype.uuid(),
    discord_id: faker.lorem.words(5),
    epic_id: faker.lorem.words(5),
    team_id: faker.datatype.uuid(),
    name: faker.name.fullName(),
  };
}
