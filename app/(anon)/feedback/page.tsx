import React from "react";

const FeedbackPage = () => {
	return (
		<div style={{ padding: "2rem", fontFamily: "Arial, sans-serif" }}>
			<h1>사용자 의견을 들려주세요</h1>
			<p>
				저희 서비스를 이용해주셔서 감사합니다. 더 나은 서비스를 제공하기 위해
				여러분의 소중한 의견을 듣고 싶습니다.
			</p>
			<form style={{ marginTop: "1rem" }}>
				<div style={{ marginBottom: "1rem" }}>
					<label
						htmlFor="feedback"
						style={{ display: "block", marginBottom: "0.5rem" }}
					>
						의견을 입력해주세요:
					</label>
					<textarea
						id="feedback"
						name="feedback"
						rows={5}
						style={{ width: "100%", padding: "0.5rem", fontSize: "1rem" }}
						placeholder="여기에 의견을 작성해주세요..."
					></textarea>
				</div>
				<button
					type="submit"
					style={{
						padding: "0.5rem 1rem",
						fontSize: "1rem",
						backgroundColor: "#0070f3",
						color: "#fff",
						border: "none",
						borderRadius: "4px",
						cursor: "pointer",
					}}
				>
					제출하기
				</button>
			</form>
		</div>
	);
};

export default FeedbackPage;
