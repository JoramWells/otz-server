// controllers/importantPatient.controller.ts
import { Request, Response, NextFunction } from 'express';
import { ImportantPatientsInterface } from 'otz-types';
import { connect } from '../domain/db/connect';
import { logger } from '../utils/logger';
import { ImportantPatient } from '../domain/models/importantPatients';
import { Patient } from '../domain/models/patients.models';

// Response interface for consistent API responses
interface ApiResponse<T = any> {
  success: boolean;
  message: string;
  data?: T;
  error?: string;
  pagination?: {
    page: number;
    limit: number;
    total: number;
    pages: number;
  };
}

// Extended Request interface for authenticated requests
interface AuthenticatedRequest extends Request {
  user?: {
    id: string;
    email: string;
    role: string;
  };
  userId?: string;
}

export class ImportantPatientController {

  // POST /api/important-patients - Create new important patient
  async createImportantPatient(
    req: AuthenticatedRequest,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const patientData: ImportantPatientsInterface = req.body;
      
      // Add user ID from authenticated request if available
      if (req.userId) {
        patientData.userID = req.userId;
      }

      let result = '';
      
      await connect.transaction(async (t) => {
        await ImportantPatient.create(patientData, {
          transaction: t,
        });
        result = 'Successfully registered a New Important Patient';
      });

      // Clear cache after creating new patient

      const response: ApiResponse<string> = {
        success: true,
        message: 'Important patient created successfully',
        data: result
      };

      logger.info({ 
        message: 'Important patient created', 
        userId: req.userId,
        patientId: patientData.id 
      });

      res.status(201).json(response);
    } catch (error) {
      logger.error({ 
        message: 'Error creating important patient', 
        error: error instanceof Error ? error.message : 'Unknown error',
        userId: req.userId 
      });
      next(error);
    }
  }

  // GET /api/important-patients - Get all important patients
  async getAllImportantPatients(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { page = 1, limit = 10, search } = req.query;
      const offset = (Number(page) - 1) * Number(limit);

      // Try to get from cache first
      
      let patients: ImportantPatientsInterface[];
      
        // Build query options
        const queryOptions: any = {
          limit: Number(limit),
          offset,
          order: [['createdAt', 'DESC']],
          include: [
            {
              model: Patient,
              attributes: ['firstName', 'middleName', 'dob', 'phoneNo'],
            },
          ],
        };

        // Add search functionality if search term provided
        if (search && typeof search === 'string') {
          queryOptions.include[0].where = {
            [Op.or]: [
              { firstName: { [Op.iLike]: `%${search}%` } },
              { middleName: { [Op.iLike]: `%${search}%` } },
              { phoneNo: { [Op.iLike]: `%${search}%` } }
            ]
          };
        }

        const { rows, count } = await ImportantPatient.findAndCountAll(queryOptions);
        patients = rows;

        // Cache the results
        
        logger.info({ message: 'Important patients fetched from database' });
      

      // Get total count for pagination
      const total = await ImportantPatient.count();

      const response: ApiResponse<ImportantPatientsInterface[]> = {
        success: true,
        message: 'Important patients retrieved successfully',
        data: patients,
        pagination: {
          page: Number(page),
          limit: Number(limit),
          total,
          pages: Math.ceil(total / Number(limit))
        }
      };

      res.status(200).json(response);
    } catch (error) {
      logger.error({ 
        message: 'Error fetching important patients', 
        error: error instanceof Error ? error.message : 'Unknown error' 
      });
      next(error);
    }
  }

  // GET /api/important-patients/:id - Get important patient by ID
  async getImportantPatientById(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { id } = req.params;

      if (!id) {
        const response: ApiResponse = {
          success: false,
          message: 'Patient ID is required'
        };
        res.status(400).json(response);
        return;
      }

      const patient = await ImportantPatient.findOne({
        where: {
          patientID: id,
        },
        attributes: ['patientID', 'userID', 'createdAt', 'updatedAt'],
        include: [
          {
            model: Patient,
            attributes: ['firstName', 'middleName', 'dob', 'phoneNo'],
          },
        ],
      });

      if (!patient) {
        const response: ApiResponse = {
          success: false,
          message: 'Important patient not found'
        };
        res.status(404).json(response);
        return;
      }

      const response: ApiResponse<ImportantPatientsInterface> = {
        success: true,
        message: 'Important patient retrieved successfully',
        data: patient
      };

      res.status(200).json(response);
    } catch (error) {
      logger.error({ 
        message: 'Error fetching important patient by ID', 
        error: error instanceof Error ? error.message : 'Unknown error',
        patientId: req.params.id 
      });
      next(error);
    }
  }

  // GET /api/important-patients/user/:userId - Get important patients by user ID
  async getImportantPatientsByUserId(
    req: AuthenticatedRequest,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { userId } = req.params;
      const { limit = 5 } = req.query;

      // Use authenticated user's ID if not provided in params
      const searchUserId = userId || req.userId;

      if (!searchUserId) {
        const response: ApiResponse = {
          success: false,
          message: 'User ID is required'
        };
        res.status(400).json(response);
        return;
      }

      const patients = await ImportantPatient.findAll({
        order: [['createdAt', 'DESC']],
        limit: Number(limit),
        where: {
          userID: searchUserId,
        },
        include: [
          {
            model: Patient,
            attributes: ['firstName', 'middleName', 'dob', 'phoneNo'],
          },
        ],
      });

      const response: ApiResponse<ImportantPatientsInterface[]> = {
        success: true,
        message: 'User important patients retrieved successfully',
        data: patients || []
      };

      res.status(200).json(response);
    } catch (error) {
      logger.error({ 
        message: 'Error fetching important patients by user ID', 
        error: error instanceof Error ? error.message : 'Unknown error',
        userId: req.params.userId 
      });
      next(error);
    }
  }

  // PUT /api/important-patients/:id - Update important patient
  async updateImportantPatient(
    req: AuthenticatedRequest,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { id } = req.params;
      const updateData: Partial<ImportantPatientsInterface> = req.body;

      if (!id) {
        const response: ApiResponse = {
          success: false,
          message: 'Patient ID is required'
        };
        res.status(400).json(response);
        return;
      }

      const patient = await ImportantPatient.findOne({
        where: { id },
      });

      if (!patient) {
        const response: ApiResponse = {
          success: false,
          message: 'Important patient not found'
        };
        res.status(404).json(response);
        return;
      }

      // Update patient with transaction
      await connect.transaction(async (t) => {
        await patient.update(updateData, { transaction: t });
      });

      const response: ApiResponse<ImportantPatientsInterface> = {
        success: true,
        message: 'Important patient updated successfully',
        data: patient
      };

      logger.info({ 
        message: 'Important patient updated', 
        patientId: id,
        userId: req.userId 
      });

      res.status(200).json(response);
    } catch (error) {
      logger.error({ 
        message: 'Error updating important patient', 
        error: error instanceof Error ? error.message : 'Unknown error',
        patientId: req.params.id,
        userId: req.userId 
      });
      next(error);
    }
  }

  // DELETE /api/important-patients/:id - Delete important patient
  async deleteImportantPatient(
    req: AuthenticatedRequest,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { id } = req.params;

      if (!id) {
        const response: ApiResponse = {
          success: false,
          message: 'Patient ID is required'
        };
        res.status(400).json(response);
        return;
      }

      const deletedCount = await ImportantPatient.destroy({
        where: { id },
      });

      if (deletedCount === 0) {
        const response: ApiResponse = {
          success: false,
          message: 'Important patient not found'
        };
        res.status(404).json(response);
        return;
      }

      const response: ApiResponse = {
        success: true,
        message: 'Important patient deleted successfully'
      };

      logger.info({ 
        message: 'Important patient deleted', 
        patientId: id,
        userId: req.userId 
      });

      res.status(200).json(response);
    } catch (error) {
      logger.error({ 
        message: 'Error deleting important patient', 
        error: error instanceof Error ? error.message : 'Unknown error',
        patientId: req.params.id,
        userId: req.userId 
      });
      next(error);
    }
  }

  // GET /api/important-patients/stats - Get important patients statistics
  async getImportantPatientsStats(
    req: AuthenticatedRequest,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { userId } = req.query;
      const searchUserId = userId || req.userId;

      let whereCondition = {};
      if (searchUserId) {
        whereCondition = { userID: searchUserId };
      }

      const totalCount = await ImportantPatient.count({ where: whereCondition });
      const recentCount = await ImportantPatient.count({
        where: {
          ...whereCondition,
          createdAt: {
            [Op.gte]: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000) // Last 30 days
          }
        }
      });

      const stats = {
        total: totalCount,
        recent: recentCount,
        percentage: totalCount > 0 ? ((recentCount / totalCount) * 100).toFixed(2) : 0
      };

      const response: ApiResponse<typeof stats> = {
        success: true,
        message: 'Important patients statistics retrieved successfully',
        data: stats
      };

      res.status(200).json(response);
    } catch (error) {
      logger.error({ 
        message: 'Error fetching important patients statistics', 
        error: error instanceof Error ? error.message : 'Unknown error',
        userId: req.userId 
      });
      next(error);
    }
  }
}
