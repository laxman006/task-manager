import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from '../users/user.schema';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private jwtService: JwtService
  ) {}

  async register(email: string, password: string) {
    const hashed = await bcrypt.hash(password, 10);
    const user = await this.userModel.create({ email, password: hashed });
    return { message: 'User registered', userId: user._id };
  }

  async login(email: string, password: string) {
    const user = await this.userModel.findOne({ email });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const token = this.jwtService.sign({ sub: user._id, email: user.email });
    return { access_token: token };
  }
}