import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { MemberRoleRepository } from "@/domain/repositories/MemberRoleRepository";
import { MemberRepository } from "@/domain/repositories/MemberRepository";

import { LoginDto } from "./dto/LoginDto";
import { MemberRoleView } from "@/domain/entities/MemberRoleView";
import { LoggedInDto } from "./dto/LoggedInDto";

export class LoginUsecase {
	constructor(
		private repository: MemberRepository,
		private memberRoleRepository: MemberRoleRepository
	) {}

	async execute(loginDto: LoginDto): Promise<LoggedInDto> {
		const { username, password } = loginDto;

		// 1. 회원데이터를 조회
		const member = await this.repository.findByUsername(username);
		// 1-1. 회원이 없을 때 오류 반환
		if (!member) {
			throw new Error("Invalid email or password");
		}

		// console.log("회원정보:", member);

		// 2. 비밀번호 검증
		const isValidPassword = await bcrypt.compare(password, member.password);
		// 2-1. 비밀번호가 일치하지 않을 때 오류 반환
		if (!isValidPassword) {
			throw new Error("Invalid email or password");
		}

		// 3. 회원의 역할목록 반환
		const memberRoles: MemberRoleView[] =
			await this.memberRoleRepository.findAllByUsername(username);

		const roleNames = memberRoles.map((memberRole) => {
			return memberRole.roleName;
		});

		// JWT 페이로드 구성 (필요한 정보만 포함)
		const payload = {
			id: member.id,
			username: member.username,
			email: member.email,
			roles: roleNames,
			image: member.image,
			createdAt: member.createdAt,
		};

		// 비밀 키는 환경 변수로 관리 (예: process.env.JWT_SECRET)
		// 토큰 유효기간은 1시간으로 설정 (필요에 따라 조정)
		const token = jwt.sign(payload, process.env.JWT_SECRET as string, {
			expiresIn: "1h",
		});

		return { token } as LoggedInDto;
	}
}
