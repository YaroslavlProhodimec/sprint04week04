"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersRepository = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const user_schema_1 = require("../schemas/user.schema");
const bcrypt = __importStar(require("bcrypt"));
let UsersRepository = class UsersRepository {
    userModel;
    constructor(userModel) {
        this.userModel = userModel;
    }
    async getAllUsers(sortData) {
        const sortDirection = sortData.sortDirection ?? 'desc';
        const sortBy = sortData.sortBy ?? 'accountData.createdAt';
        const pageSize = sortData.pageSize ?? 10;
        const pageNumber = sortData.pageNumber ?? 1;
        const searchLoginTerm = sortData.searchLoginTerm ?? null;
        const searchEmailTerm = sortData.searchEmailTerm ?? null;
        const searchFilters = [];
        if (searchLoginTerm) {
            searchFilters.push({
                'accountData.login': {
                    $regex: searchLoginTerm,
                    $options: 'i'
                }
            });
        }
        if (searchEmailTerm) {
            searchFilters.push({
                'accountData.email': {
                    $regex: searchEmailTerm,
                    $options: 'i'
                }
            });
        }
        const filter = searchFilters.length > 0 ? { $or: searchFilters } : {};
        const sortByField = sortBy === 'login'
            ? 'accountData.login'
            : sortBy === 'email'
                ? 'accountData.email'
                : sortBy === 'createdAt'
                    ? 'accountData.createdAt'
                    : sortBy;
        const numPage = +pageNumber;
        const numSize = +pageSize;
        const users = await this.userModel
            .find(filter)
            .sort({ [sortByField]: sortDirection === 'desc' ? -1 : 1 })
            .skip((numPage - 1) * numSize)
            .limit(numSize)
            .exec();
        const totalCount = await this.userModel.countDocuments(filter);
        const pageCount = Math.ceil(totalCount / numSize);
        return {
            pagesCount: pageCount,
            page: numPage,
            pageSize: numSize,
            totalCount,
            items: users.map(user => ({
                id: user._id.toString(),
                login: user.accountData.login,
                email: user.accountData.email,
                createdAt: user.accountData.createdAt
            }))
        };
    }
    async createUser(login, email, password) {
        const passwordSalt = await bcrypt.genSalt(10);
        const passwordHash = await bcrypt.hash(password, passwordSalt);
        const userData = {
            accountData: {
                login,
                email,
                passwordHash,
                passwordSalt,
                createdAt: new Date()
            },
            emailConfirmation: {
                confirmationCode: null,
                isConfirmed: true,
                expirationDate: null,
            },
            isConfirmed: true,
        };
        const newUser = new this.userModel(userData);
        await newUser.save();
        return {
            id: newUser._id.toString(),
            login: newUser.accountData.login,
            email: newUser.accountData.email,
            createdAt: newUser.accountData.createdAt
        };
    }
    async deleteUser(id) {
        try {
            const result = await this.userModel.deleteOne({ _id: id }).exec();
            return result.deletedCount > 0;
        }
        catch (error) {
            return false;
        }
    }
    async getLoginByUserId(userId) {
        try {
            const user = await this.userModel.findById(userId).lean().exec();
            return user?.accountData?.login ?? null;
        }
        catch {
            return null;
        }
    }
    async findById(id) {
        try {
            if (!id?.match?.(/^[0-9a-fA-F]{24}$/))
                return null;
            return this.userModel.findById(id).exec();
        }
        catch {
            return null;
        }
    }
    async findByEmail(email) {
        return this.userModel.findOne({ 'accountData.email': email }).exec();
    }
    async findByLogin(login) {
        return this.userModel.findOne({ 'accountData.login': login }).exec();
    }
    async findByConfirmationCode(code) {
        return this.userModel.findOne({ 'emailConfirmation.confirmationCode': code }).exec();
    }
    async findByRecoveryCode(recoveryCode) {
        return this.userModel.findOne({ recoveryCode }).exec();
    }
    async createForRegistration(login, email, password, confirmationCode, expirationDate) {
        const passwordSalt = await bcrypt.genSalt(10);
        const passwordHash = await bcrypt.hash(password, passwordSalt);
        const userData = {
            accountData: {
                login,
                email,
                passwordHash,
                passwordSalt,
                createdAt: new Date(),
            },
            emailConfirmation: {
                confirmationCode,
                isConfirmed: false,
                expirationDate,
            },
            recoveryCode: null,
            recoveryCodeExpiration: null,
        };
        const newUser = new this.userModel(userData);
        return newUser.save();
    }
    async confirmUser(userId) {
        const id = typeof userId === 'string' ? userId : userId?.toString?.();
        return this.userModel
            .findByIdAndUpdate(id, {
            $set: {
                'emailConfirmation.isConfirmed': true,
                'emailConfirmation.confirmationCode': null,
                'emailConfirmation.expirationDate': null,
            },
        }, { new: true })
            .exec();
    }
    async updateConfirmationCode(userId, confirmationCode, expirationDate) {
        const result = await this.userModel
            .updateOne({ _id: userId }, {
            $set: {
                'emailConfirmation.confirmationCode': confirmationCode,
                'emailConfirmation.expirationDate': expirationDate,
                'emailConfirmation.isConfirmed': false,
            },
        })
            .exec();
        return (result.modifiedCount ?? 0) >= 1;
    }
    async setRecoveryCode(userId, recoveryCode, expirationDate) {
        const result = await this.userModel
            .updateOne({ _id: userId }, { $set: { recoveryCode, recoveryCodeExpiration: expirationDate } })
            .exec();
        return (result.modifiedCount ?? 0) >= 1;
    }
    async setNewPassword(userId, newPassword) {
        const passwordSalt = await bcrypt.genSalt(10);
        const passwordHash = await bcrypt.hash(newPassword, passwordSalt);
        const result = await this.userModel
            .updateOne({ _id: userId }, {
            $set: {
                'accountData.passwordHash': passwordHash,
                'accountData.passwordSalt': passwordSalt,
                recoveryCode: null,
                recoveryCodeExpiration: null,
            },
        })
            .exec();
        return (result.modifiedCount ?? 0) >= 1;
    }
    async deleteById(id) {
        return this.deleteUser(id);
    }
};
exports.UsersRepository = UsersRepository;
exports.UsersRepository = UsersRepository = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(user_schema_1.User.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], UsersRepository);
//# sourceMappingURL=users.repository.js.map