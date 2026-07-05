const AppError = require("../utils/AppError");
const { runInvestmentResearch } = require("../../server/graph/investmentGraph");

const createResearch = async (req, res, next) => {
  try {
    const { companyName } = req.body;

    if (!companyName || typeof companyName !== "string" || !companyName.trim()) {
      return next(new AppError("companyName is required", 400, null, "INVALID_COMPANY_NAME"));
    }

    const normalizedCompanyName = companyName.trim();
    const result = await runInvestmentResearch(normalizedCompanyName);

    res.status(200).json({
      success: true,
      message: "Research completed",
      data: result,
    });
  } catch (error) {
    if (error instanceof AppError) {
      return next(error);
    }

    if (error instanceof Error && /company/i.test(error.message)) {
      return next(new AppError("No publicly listed company was found matching the provided name.", 404, null, "COMPANY_NOT_FOUND"));
    }

    return next(new AppError("We couldn't complete the research request right now.", 500, null, "RESEARCH_FAILED"));
  }
};

module.exports = {
  createResearch,
};
