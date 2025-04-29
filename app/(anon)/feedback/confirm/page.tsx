import React from "react";

function FeedbackConfirmPage() {
	return (
		<div
			style={{
				display: "flex",
				flexDirection: "column",
				alignItems: "center",
				justifyContent: "center",
				height: "100vh",
				textAlign: "center",
			}}
		>
			<h1>피드백이 정상적으로 등록되었습니다!</h1>
			<p>소중한 의견을 보내주셔서 감사합니다.</p>
			<button
				onClick={() => (window.location.href = "/")}
				style={{
					marginTop: "20px",
					padding: "10px 20px",
					fontSize: "16px",
					cursor: "pointer",
				}}
			>
				홈으로 돌아가기
			</button>
		</div>
	);
}

export default FeedbackConfirmPage;
