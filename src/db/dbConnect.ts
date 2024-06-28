/* eslint-disable no-console */
import { connect } from 'mongoose';

export async function connectMongoDB(uri: string) {
  try {
    await connect(uri as string).then((data: any) =>
      console.log(`Database Connected to ${data?.connection.host}`),
    );
  } catch (error) {
    throw new Error((error as any).message);
  }
}
