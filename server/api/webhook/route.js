export async function POST(request) {
    const data = await request.json();

    console.log("MT5 DATA:", data);

    return Response.json({
        success: true
    });
}