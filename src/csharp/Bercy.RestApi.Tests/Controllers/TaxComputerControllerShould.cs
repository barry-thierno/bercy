namespace Bercy.RestApi.Tests.Controllers
{
    using System;
    using System.Collections.Generic;
    using System.Net;
    using System.Net.Http;
    using System.Text;
    using System.Threading.Tasks;
    using Dtos;
    using Microsoft.AspNetCore.Hosting;
    using Microsoft.AspNetCore.TestHost;
    using Microsoft.VisualStudio.TestTools.UnitTesting;
    using Newtonsoft.Json;

    [TestClass]
    public class TaxComputerControllerShould
    {
        private readonly HttpClient client;

        public TaxComputerControllerShould()
        {
            var server = new TestServer(new WebHostBuilder().UseEnvironment("Developement").UseStartup<Startup>());
            this.client = server.CreateClient();
        }

        [TestMethod]
        public async Task GiveBackTheTax_When_InputIsCorrect()
        {
            var body = new TaxComputationRequestDto
            {
                Wage = 50000,
                Year = 2020,
                TaxHouseholdComposition = new TaxHouseholdCompositionDto
                {
                    NbAdults = 2,
                    NbChildren = 1
                }
            };

            var jsonBody = JsonConvert.SerializeObject(body);
            var request = new HttpRequestMessage(new HttpMethod("POST"), "/api/v1.0/TaxComputer")
                {Content = new StringContent(jsonBody, Encoding.UTF8, "application/json")};

            var response = await this.client.SendAsync(request);

            Assert.AreEqual(HttpStatusCode.OK, response.StatusCode);

            var responseJson = await response.Content.ReadAsStringAsync();

            var taxDto = JsonConvert.DeserializeObject<TaxDto>(responseJson);

            Assert.AreEqual(2777, taxDto.Amount);
            Assert.AreEqual(5.55, taxDto.MarginalTaxRate);
        }

        [DataTestMethod]
        [DynamicData(nameof(GetDataThatShouldFail), DynamicDataSourceType.Method)]
        public async Task GiveBackAnError_When_InputIsIncorrect(TaxComputationRequestDto taxComputationRequestDto)
        {
            var jsonBody = JsonConvert.SerializeObject(taxComputationRequestDto);
            var request = new HttpRequestMessage(new HttpMethod("POST"), "/api/v1.0/TaxComputer")
                { Content = new StringContent(jsonBody, Encoding.UTF8, "application/json") };

            var response = await this.client.SendAsync(request);

            Assert.AreEqual(HttpStatusCode.BadRequest, response.StatusCode);
        }

        public static IEnumerable<object[]> GetDataThatShouldFail()
        {
            yield return new object[] {new TaxComputationRequestDto() };
            yield return new object[] { new TaxComputationRequestDto
            {
                Year = -5
            } };
            yield return new object[] { new TaxComputationRequestDto
            {
                Year = -5,
                Wage = -90
            } };
            yield return new object[] { new TaxComputationRequestDto
            {
                TaxHouseholdComposition = new TaxHouseholdCompositionDto
                {
                    NbAdults = 0
                }
            } };
            yield return new object[] { new TaxComputationRequestDto
            {
                TaxHouseholdComposition = new TaxHouseholdCompositionDto
                {
                    NbChildren = -6
                }
            } };
        }
    }
}
