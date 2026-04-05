import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { DeviceSession, DeviceSessionDocument } from '../schemas/deviceSession.schema';

@Injectable()
export class DeviceSessionsRepository {
  constructor(
    @InjectModel(DeviceSession.name) private sessionModel: Model<DeviceSessionDocument>,
  ) {}

  async createSession(
    userId: string,
    deviceId: string,
    issuedAt: Date,
    expirationDate: Date,
  ): Promise<DeviceSessionDocument> {
    const session = new this.sessionModel({
      userId,
      deviceId,
      issuedAt,
      expirationDate,
      lastActiveDate: issuedAt,
    });
    return session.save();
  }

  async findByDeviceId(deviceId: string): Promise<DeviceSessionDocument | null> {
    return this.sessionModel.findOne({ deviceId }).exec();
  }

  async updateSession(
    deviceId: string,
    issuedAt: Date,
    expirationDate: Date,
  ): Promise<boolean> {
    const result = await this.sessionModel
      .updateOne(
        { deviceId },
        { $set: { issuedAt, expirationDate, lastActiveDate: issuedAt } },
      )
      .exec();
    return (result.modifiedCount ?? 0) >= 1;
  }

  async deleteByDeviceId(deviceId: string): Promise<boolean> {
    const result = await this.sessionModel.deleteOne({ deviceId }).exec();
    return result.deletedCount > 0;
  }
}
