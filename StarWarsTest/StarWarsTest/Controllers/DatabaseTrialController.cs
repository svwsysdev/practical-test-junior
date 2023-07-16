using Microsoft.AspNetCore.Mvc;

namespace StarWarsTest.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class DatabaseTrialController : ControllerBase
    {
 
        private readonly ILogger<DatabaseTrialController> _logger;
        private List<TrialData> _trialData;

        public DatabaseTrialController(ILogger<DatabaseTrialController> logger)
        {
            _logger = logger;
        }

        [HttpGet]
        public IEnumerable<TrialData> Get()
        {
            _trialData = new List<TrialData>();
            _trialData.Add(new TrialData() { Name = "dummy data 1" });
            _trialData.Add(new TrialData() { Name = "dummy data 2" });
            _trialData.Add(new TrialData() { Name = "dummy data 3" });
            _trialData.Add(new TrialData() { Name = "dummy data 4" });
            return _trialData.ToArray();
         
        }

        [HttpPost]
        public IActionResult Save(TrialData trialData)
        {

           return Ok("Data saved");
        }
    }
}