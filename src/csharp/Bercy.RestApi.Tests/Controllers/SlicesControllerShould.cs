namespace Bercy.RestApi.Tests.Controllers
{
    using System.Net;
    using System.Net.Http;
    using System.Threading.Tasks;
    using Microsoft.AspNetCore.Hosting;
    using Microsoft.AspNetCore.Http;
    using Microsoft.AspNetCore.Mvc;
    using Microsoft.AspNetCore.TestHost;
    using Microsoft.VisualStudio.TestTools.UnitTesting;
    using Newtonsoft.Json;

    [TestClass]
    public class SlicesControllerShould
    {
        private readonly HttpClient client;

        public SlicesControllerShould()
        {
            var server = new TestServer(new WebHostBuilder().UseEnvironment("Developement").UseStartup<Startup>());
            this.client = server.CreateClient();
        }

        [TestMethod]
        public async Task GiveBackSlicesFor2019_When_AskingFor2019Slices()
        {
            var request = new HttpRequestMessage(new HttpMethod("GET"), $"/api/v1.0/slices?year=2019");

            var response = await this.client.SendAsync(request);

            Assert.AreEqual(HttpStatusCode.OK, response.StatusCode);
        }

        [TestMethod]
        public async Task NotAllowBadYear_When_AskingForYearMinus5()
        {
            var request = new HttpRequestMessage(new HttpMethod("GET"), $"/api/v1.0/slices?year=-5");

            var response = await this.client.SendAsync(request);

            Assert.AreEqual(HttpStatusCode.BadRequest, response.StatusCode);

            var responseJson = await response.Content.ReadAsStringAsync();

            var problemDetails = JsonConvert.DeserializeObject<ProblemDetails>(responseJson);

            Assert.AreEqual(StatusCodes.Status400BadRequest, problemDetails.Status);
            Assert.AreEqual("The given year is not acceptable.", problemDetails.Title);
        }

        [TestMethod]
        public async Task NotAllowValidYear_When_AskingForValidYearWithNoData()
        {
            var request = new HttpRequestMessage(new HttpMethod("GET"), $"/api/v1.0/slices?year=2001");

            var response = await this.client.SendAsync(request);

            Assert.AreEqual(HttpStatusCode.NotFound, response.StatusCode);

            var responseJson = await response.Content.ReadAsStringAsync();

            var problemDetails = JsonConvert.DeserializeObject<ProblemDetails>(responseJson);

            Assert.AreEqual(StatusCodes.Status404NotFound, problemDetails.Status);
            Assert.AreEqual("The given year is acceptable, but no slice found.", problemDetails.Title);
        }
    }
}
