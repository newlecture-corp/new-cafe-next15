import { SignedUpDto } from "@/application/usecases/auth/dto/SignedUpDto";
import { SignUpDto } from "@/application/usecases/auth/dto/SignUpDto";
import { SignUpUsecase } from "@/application/usecases/auth/SignUpUsecase";
import { PrMemberRepository } from "@/infra/repositories/prisma/PrMemberRepository";
import { PrStorageRepository } from "@/infra/repositories/prisma/PrStorageRepository";

import { NextResponse } from "next/server";

export async function POST(request: Request) {
	try {
		const formData = await request.formData();
		const body: Record<string, string | File> = {};
		formData.forEach((value, key) => {
			body[key] = value;
		});

		const signDto: SignUpDto = {
			username: body.username as string,
			password: body.password as string,
			email: body.email as string,
			image: body.image as File | undefined,
		};

		const signUpUsecase = new SignUpUsecase(
			new PrMemberRepository(),
			new PrStorageRepository()
		);

		const signedUpDto: SignedUpDto = await signUpUsecase.execute(signDto);

		return NextResponse.json(
			{ message: "Member created successfully", data: signedUpDto },
			{ status: 201 }
		);
	} catch (error) {
		console.error("Error processing POST request:", error);
		return NextResponse.json(
			{ message: "Failed to create member" },
			{ status: 500 }
		);
	}
}
