import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type DeviceSessionDocument = DeviceSession & Document;

@Schema()
export class DeviceSession {
  @Prop({ required: true })
  userId: string;

  @Prop({ required: true })
  deviceId: string;

  @Prop({ required: true })
  issuedAt: Date;

  @Prop({ required: true })
  expirationDate: Date;

  @Prop({ required: true })
  lastActiveDate: Date;
}

export const DeviceSessionSchema = SchemaFactory.createForClass(DeviceSession);

DeviceSessionSchema.index({ deviceId: 1 }, { unique: true });
