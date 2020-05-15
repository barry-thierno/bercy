using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;

namespace Bercy.RestApi
{
    using System.IO;
    using System.Reflection;
    using AutoMapper;
    using FamilyQuotient;
    using Microsoft.AspNetCore.Http;
    using Microsoft.OpenApi.Models;
    using Shares;
    using Slices;
    using TaxComputer;

    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddControllers();
            services.AddApiVersioning();

            services.AddAutoMapper(typeof(Startup));
            services.AddSingleton<ISliceByYearProvider, SliceByYearProvider>();

            services.AddTransient<IIRCalculator, IRCalculator>();
            services.AddTransient<IFamilyQuotientTaxComputer, FamilyQuotientTaxComputer>();
            services.AddTransient<IClassicTaxComputer, ClassicTaxComputer>();
            services.AddTransient<IFamilyQuotientTaxChooser, FamilyQuotientTaxChooser>();

            services.AddTransient<IShareComputer, ShareComputer>();
            services.AddSingleton<IFamilyQuotientByYearProvider, FamilyQuotientByYearProvider>();
            
            services.AddSwaggerGen(c =>
            {
                c.SwaggerDoc(
                    "v1.0", new OpenApiInfo
                    {
                        Title = "Bercy REST Api",
                        Version = "v1.0",
                        Description = "Bercy ASP.NET Core Web API",
                    });

                var xmlFile = $"{Assembly.GetExecutingAssembly().GetName().Name}.xml";
                var xmlPath = Path.Combine(AppContext.BaseDirectory, xmlFile);
                c.IncludeXmlComments(xmlPath);
            });

            services.Configure<ApiBehaviorOptions>(options =>
            {
                options.InvalidModelStateResponseFactory = context =>
                {
                    var problemDetails = new ValidationProblemDetails(context.ModelState)
                    {
                        Instance = context.HttpContext.Request.Path,
                        Status = StatusCodes.Status400BadRequest,
                        Title = "The input is invalid.",
                        Type = "https://httpstatuses.com/400"
                    };

                    return new BadRequestObjectResult(problemDetails);
                };
            });
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(
            IApplicationBuilder app,
            IWebHostEnvironment env,
            ISliceByYearProvider sliceByYearProvider,
            IFamilyQuotientByYearProvider familyQuotientByYearProvider)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            app.UseSwagger();

            app.UseSwaggerUI(c =>
            {
                c.SwaggerEndpoint("/swagger/v1.0/swagger.json", "Bercy REST Api V1.0");
            });

            app.UseHttpsRedirection();

            app.UseRouting();

            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });

            sliceByYearProvider.AddSlice(2019, new Slice { Low = 0, High = 10064, Rate = 0 });
            sliceByYearProvider.AddSlice(2019, new Slice { Low = 10065, High = 27794, Rate = 14 });
            sliceByYearProvider.AddSlice(2019, new Slice { Low = 27795, High = 74517, Rate = 30 });

            sliceByYearProvider.AddSlice(2020, new Slice { Low = 0, High = 10064, Rate = 0 });
            sliceByYearProvider.AddSlice(2020, new Slice { Low = 10065, High = 25659, Rate = 14 });
            sliceByYearProvider.AddSlice(2020, new Slice { Low = 25660, High = 73339, Rate = 30 });

            familyQuotientByYearProvider.AddFamilyQuotient(2019, 1551);
            familyQuotientByYearProvider.AddFamilyQuotient(2020, 1567);
        }
    }
}
