using Microsoft.AspNetCore.Mvc;

namespace Bercy.RestApi.Controllers
{
    using AutoMapper;
    using Dtos;

    [ApiVersion("1.0")]
    [Route("api/v{version:apiVersion}/[controller]")]
    [ApiController]
    public class TaxComputerController : ControllerBase
    {
        private readonly IMapper mapper;
        private readonly IIRCalculator irCalculator;

        public TaxComputerController(IMapper mapper, IIRCalculator irCalculator)
        {
            this.mapper = mapper;
            this.irCalculator = irCalculator;
        }

        /// <summary>
        /// Computes the tax for the given parameters
        /// </summary>
        /// <param name="taxComputationRequestDto">The parameters of the computation to be made</param>
        /// <returns>The tax</returns>
        [HttpPost]
        [ProducesResponseType(typeof(TaxDto), 200)]
        [ProducesResponseType(typeof(ProblemDetails), 400)]
        [ProducesResponseType(500)]
        public ActionResult<TaxDto> Compute(TaxComputationRequestDto taxComputationRequestDto)
        {
            var taxComputationRequest = this.mapper.Map<TaxComputationRequest>(taxComputationRequestDto);
            var tax = this.irCalculator.Compute(taxComputationRequest);
            return this.mapper.Map<TaxDto>(tax);
        }
    }
}