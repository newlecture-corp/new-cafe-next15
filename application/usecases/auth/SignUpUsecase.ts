// ***********************************

// 이 코드는 사용되지 않는 코드입니다.
// 현재는 next auth를 사용하고 있습니다.

// ***********************************

import { MemberRepository } from "@/domain/repositories/MemberRepository";

import bcrypt from "bcryptjs";

// import { Member } from "@/domain/entities/Memeber";
import { Member } from "@/prisma/generated";

import { SignUpDto } from "./dto/SignUpDto";
import { SignedUpDto } from "./dto/SignedUpDto";
import { StorageRepository } from "@/domain/repositories/StorageRepository";

export class SignUpUsecase {
	constructor(
		private readonly memberRepository: MemberRepository,
		private readonly storageRepository: StorageRepository
	) {}

	async execute(memberDto: SignUpDto): Promise<SignedUpDto> {
		const { username, email, password, image } = memberDto;

		let fileName: string | undefined = undefined;

		if (image) {
			fileName = await this.storageRepository.save(image as File);
		}

		const hashedPassword = await bcrypt.hash(password, 10);

		const member: Partial<Member> = {
			username: username,
			email: email,
			password: hashedPassword,
			profileImage: fileName ?? null,
		};

		// Supabase 회원가입 처리
		const newMember = await this.memberRepository.save(member as Member);

		// 회원가입 성공 시 반환할 DTO 객체 매핑 및 반환
		return { ...newMember } as SignedUpDto;
	}
}
