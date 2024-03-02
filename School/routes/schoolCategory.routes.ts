import express from 'express'
import { SchoolCategoryController } from '../adapters/controllers/schoolCategoryController';
import {SchoolCategoryRepository} from '../adapters/repositories/schoolCategoryRepository'
import {SchoolCategoryInteractor} from '../application/interactors/schoolInteractor'
const repository = new SchoolCategoryRepository();

const interactor = new SchoolCategoryInteractor(repository);
const controller = new SchoolCategoryController(interactor)

const router = express.Router()