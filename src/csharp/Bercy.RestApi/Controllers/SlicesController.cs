namespace Bercy.RestApi.Controllers
{
    using Bercy.Slices;
    using System.Collections.Generic;
    using System.Linq;
    using AutoMapper;
    using Dtos;
    using Microsoft.AspNetCore.Http;
    using Microsoft.AspNetCore.Mvc;

    [ApiVersion("1.0")]
    [Route("api/v{version:apiVersion}/[controller]")]
    [ApiController]
    public class SlicesController : ControllerBase
    {
        private readonly IMapper mapper;
        private readonly ISliceByYearProvider sliceByYearProvider;

        public SlicesController(IMapper mapper, ISliceByYearProvider sliceByYearProvider)
        {
            this.mapper = mapper;
            this.sliceByYearProvider = sliceByYearProvider;
        }

        /// <summary>
        /// Gets the slices for a given year
        /// </summary>
        /// <param name="year" example="2019">The year to be applied</param>
        /// <returns>The list of slices for the year</returns>
        /// <response code="200">Result is OK</response>
        /// <response code="400">Input is invalid</response>
        /// <response code="404">No data for the year</response>
        /// <response code="500">Internal error</response>
        [HttpGet]
        [ProducesResponseType(typeof(IEnumerable<SliceDto>), 200)]
        [ProducesResponseType(typeof(ProblemDetails), 400)]
        [ProducesResponseType(typeof(ProblemDetails), 404)]
        [ProducesResponseType(500)]
        public ActionResult<IEnumerable<SliceDto>> Get(int year)
        {
            if (year < 0)
            {
                var problemDetails = new ProblemDetails
                {
                    Status = StatusCodes.Status400BadRequest,
                    Title = "The given year is not acceptable.",
                    Detail = $"The year {year} is under zero.",
                    Instance = HttpContext.Request.Path
                };

                return new BadRequestObjectResult(problemDetails);
            }

            if (!this.sliceByYearProvider.Contains(year))
            {
                var problemDetails = new ProblemDetails
                {
                    Status = StatusCodes.Status404NotFound,
                    Title = "The given year is acceptable, but no slice found.",
                    Detail = $"The year {year} is not configured.",
                    Instance = HttpContext.Request.Path
                };
                return new NotFoundObjectResult(problemDetails);
            }

            return new OkObjectResult(this.sliceByYearProvider.GetSlicesForYear(year).Select(slice => this.mapper.Map<SliceDto>(slice)));
        }
    }
}