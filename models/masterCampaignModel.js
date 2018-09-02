var redshift = require('../redshift.js');
var async = require("async");
var moment = require('moment');
var sql = require('sql-bricks-sqlite');
var sql1 = require('sql-bricks-postgres');
var select = sql.select(), $in = sql.in;
var mcaselect = sql.select(), $in = sql.in;
var businesstypeselect = sql.select(), $in = sql.in;
var programFamilySelect = sql.select(), $in = sql.in;
var mastercampaign = sql.select(), $in = sql.in;
var programtabdata = sql.select(), $in = sql.in;
var programfamily = sql.select(), $in = sql.in;
var mcasegments = sql.select(), $in = sql.in;
var leadbusinessgroups = sql.select(), $in = sql.in;
var leadbusinessline = sql.select(), $in = sql.in;
var leadbusinesstype = sql.select(), $in = sql.in;
var leadindustry = sql.select(), $in = sql.in;
var markets = sql.select(), $in = sql.in;
var secbusinessgroups = sql.select(), $in = sql.in;
var secbusinesslines = sql.select(), $in = sql.in;
var secbusinesstype = sql.select(), $in = sql.in;

var date = require('date-and-time');

//var sss = select.distinct();
//module.exports.list = function(req, res){
//  redshift.query('SELECT mcasegmentid, mcasegmentname FROM apps."mcasegments"', {raw: true}, function(err, datamcaSegment){
//    if(err) throw err;
//    console.log(datamcaSegment[0].mcasegmentname);
//     res.render('../views/CST/mastercampaign', {page_title:"Master Campaign", data:datamcaSegment});
//  });
//}


module.exports.list = function (req, res) {
  async.parallel([
    function (callback) { redshift.query('SELECT mcasegmentid,    mcasegmentname FROM apps."mcasegments"', callback) },
    function (callback) { redshift.query('SELECT businessgroupid, businessgroupname  FROM apps."businessgroups"', callback) },
    function (callback) { redshift.query('SELECT businesstypeid,businesstypename  FROM apps."businesstype"', callback) },
    function (callback) { redshift.query('SELECT programfamiliyid,programfamiliyname  FROM apps."programfamilies"', callback) }

  ], function (err, results) {
    console.log(results[0].rows);
    console.log('second row');
    console.log(results[1].rows);
    res.render('../views/CST/mastercampaign', { mcasegment: results[0].rows, businessgroups: results[1].rows, businesstype: results[2].rows, programfamilies: results[3].rows });
  });
}

module.exports.subcampaign = function (req, res) {
  async.parallel([
    function (callback) {
      redshift.query('SELECT mcasegmentid,    mcasegmentname FROM apps."mcasegments"', callback)
      console.log("callback result is" + callback);
    },
    function (callback) { redshift.query('SELECT businessgroupid, businessgroupname  FROM apps."businessgroups"', callback) },
    function (callback) { redshift.query('SELECT businesstypeid,businesstypename  FROM apps."businesstype"', callback) },
    function (callback) { redshift.query('SELECT programfamiliyid,programfamiliyname  FROM apps."programfamilies"', callback) },
    function (callback) { redshift.query('SELECT marketid,marketname  FROM apps."market"', callback) }
  ], function (err, results) {
    console.log(results[0].rows);
    console.log('second row');
    console.log(results[1].rows);
    console.log('third row');
    console.log('market' + results[4].rows);
    res.render('../views/CST/subcampaign', { mcasegment: results[0].rows, businessgroups: results[1].rows, businesstype: results[2].rows, programfamilies: results[3].rows, market: results[4].rows });
  });
}
module.exports.subcampaign1 = function (req, res) {
  async.parallel([
    function (callback) {
      redshift.query('SELECT mcasegmentid,    mcasegmentname FROM apps."mcasegments"', callback)
      console.log("callback result is" + callback);
    },
    function (callback) { redshift.query('SELECT businessgroupid, businessgroupname  FROM apps."businessgroups"', callback) },
    function (callback) { redshift.query('SELECT businesstypeid,businesstypename  FROM apps."businesstype"', callback) },
    function (callback) { redshift.query('SELECT programfamiliyid,programfamiliyname  FROM apps."programfamilies"', callback) },
    function (callback) { redshift.query('SELECT marketid,marketname  FROM apps."market"', callback) },
    function (callback) { redshift.query('select mastercampaignid,mastercampaignname from apps."mastercampaigns"', callback) },
    function (callback) { redshift.query('select businesslineid,businesslinename from apps."businesslines"', callback) },
    function (callback) { redshift.query('select industryid,industryname from apps."industry"', callback) }
  ], function (err, results) {
    console.log(results[0].rows);
    console.log('second row');
    console.log(results[1].rows);
    console.log('third row');
    console.log('market' + results[4].rows);
    console.log('campaign' + results[5].rows);
    res.render('../views/CST/subcampaign', { mcasegment: results[0].rows, businessgroups: results[1].rows, businesstype: results[2].rows, programfamilies: results[3].rows, market: results[4].rows, campaign: results[5].rows, businessline: results[6].rows, industry: results[7].rows });
  });
}
/* 
module.exports.mca = function(mcasegmentname,req,res){

  redshift.parameterizedQuery('SELECT mcasegmentid FROM apps."mcasegments" WHERE "mcasegmentname" = $1', [mcasegmentname], { raw: true } , function(err,res){
    if(err){

    }else{
      console.log("mcaid is "+ JSON.stringify(res));
      return (JSON.stringify(res))
    }
  });
sqlbri
}
 */
module.exports.saveDraft = function (req, res) {
  async.parallel([
    function (callback) {
      redshift.query('SELECT a.mastercampaignid,a.mastercampaignname,a.campaignmanager,a.campaigndescription,a.startdate,a.enddate FROM apps."mastercampaigns" a', callback)
      //console.log("callback result is" + callback);
    }
  ], function (err, results) {
    console.log(JSON.stringify(results[0].rows));

    res.render('../views/CST/savedraft', { mastercampaign: results[0].rows });
  });
}

module.exports.getPrograme = function (req, res) {
  async.parallel([
    function (callback) {
      redshift.query('SELECT a.programid,a.programname,a.campaignmanager,a.programdescription FROM apps."programs" a', callback)
      //console.log("callback result is" + callback);
    }
  ], function (err, results) {
    console.log(JSON.stringify(results[0].rows));

    res.render('../views/CST/programsavedraft', { program: results[0].rows });
  });
}


module.exports.list11 = function (req, res) {
  async.parallel([
    function (callback) { redshift.query('SELECT mcasegmentid,    mcasegmentname FROM apps."mcasegments"', callback) },
  ], function (err, results) {
    console.log(results[0].rows);
    console.log('second row');
    console.log(results[1].rows);
    res.render('../views/CST/saveDrafrhandler', { mcasegment: results[0].rows, businessgroups: results[1].rows, businesstype: results[2].rows, programfamilies: results[3].rows });
  });
}


exports.bhbhbnames1 = function (req, res, id) {
  //var startdate = {"startdate":startdate}
  // var startdate = startdate;
  // var endDate = enddate;
  // console.log('inside start date' + startdate);
  // console.log('inside start date' + endDate);
  var cmpaignId = id;
  console.log("campaign ID is " + cmpaignId);
  /* var statement1 = select.distinct('apps.businessgroups.businessgroupname', 'apps.businessgroups.businessgroupid').from('apps.businessgroups').where($in('apps.mastercampaignsbusinessgroups.mastercampaignid', cmpaignId)).innerJoin('apps.mastercampaignsbusinessgroups').on('apps.mastercampaignsbusinessgroups.businessgroupid', 'apps.businessgroups.businessgroupid').toParams();
  var statement2 = select.distinct('apps.businessgroups.businessgroupname', 'apps.businessgroups.businessgroupid').from('apps.businessgroups').where($in('apps.mastercampaignsbusinessgroups.mastercampaignid', cmpaignId)).innerJoin('apps.mastercampaignsbusinessgroups').on('apps.mastercampaignsbusinessgroups.businessgroupid', 'apps.businessgroups.businessgroupid').toParams();

  var statement3 = select.distinct('apps.mcasegments.mcasegmentname', 'apps.mcasegments.mcasegmentid').from('apps.mcasegments').where($in('apps.mastercampaignsmcasegments.mastercampaignid', cmpaignId)).innerJoin('apps.mastercampaignsmcasegments').on('apps.mastercampaignsmcasegments.mcasegmentid', 'apps.mcasegments.mcasegmentid').toParams();
  console.log('statement1 is' + JSON.stringify(statement1))
  console.log('statement3 is' + JSON.stringify(statement3)) */
  //console.log(programFamilySelect.distinct('apps.programfamilies.programfamiliyname', 'apps.programfamilies.programfamiliyid').from('apps.programfamilies').where($in('apps.mastercampaignsprogramfamilies.mastercampaignid', cmpaignId)).innerJoin('apps.mastercampaignsprogramfamilies').on('apps.mastercampaignsprogramfamilies.programfamiliyid', 'apps.programfamilies.programfamiliyid').toParams());//


  async.parallel([
    function (callback) { redshift.query(select.distinct('apps.businessgroups.businessgroupname', 'apps.businessgroups.businessgroupid').from('apps.businessgroups').where($in('apps.mastercampaignsbusinessgroups.mastercampaignid', cmpaignId)).innerJoin('apps.mastercampaignsbusinessgroups').on('apps.mastercampaignsbusinessgroups.businessgroupid', 'apps.businessgroups.businessgroupid').toParams(), callback) },
    function (callback) { redshift.query(mcaselect.distinct('apps.mcasegments.mcasegmentname', 'apps.mcasegments.mcasegmentid').from('apps.mcasegments').where($in('apps.mastercampaignsmcasegments.mastercampaignid', cmpaignId)).innerJoin('apps.mastercampaignsmcasegments').on('apps.mastercampaignsmcasegments.mcasegmentid', 'apps.mcasegments.mcasegmentid').toParams(), callback) },
    function (callback) { redshift.query(businesstypeselect.distinct('apps.businesstype.businesstypename', 'apps.businesstype.businesstypeid').from('apps.businesstype').where($in('apps.mastercampaignsbusinesstype.mastercampaignid', cmpaignId)).innerJoin('apps.mastercampaignsbusinesstype').on('apps.mastercampaignsbusinesstype.businesstypeid', 'apps.businesstype.businesstypeid').toParams(), callback) },
    function (callback) { redshift.query(programFamilySelect.distinct('apps.programfamilies.programfamiliyname', 'apps.programfamilies.programfamiliyid').from('apps.programfamilies').where($in('apps.mastercampaignsprogramfamilies.mastercampaignid', cmpaignId)).innerJoin('apps.mastercampaignsprogramfamilies').on('apps.mastercampaignsprogramfamilies.programfamilyid', 'apps.programfamilies.programfamiliyid').toParams(), callback) },
    function (callback) { redshift.query(mastercampaign.select('apps.mastercampaigns.mastercampaignid', 'apps.mastercampaigns.campaignmanager', 'apps.mastercampaigns.campaigndescription', 'apps.mastercampaigns.mastercampaignname', 'apps.mastercampaigns.startdate', 'apps.mastercampaigns.enddate').from('apps.mastercampaigns').where($in('apps.mastercampaigns.mastercampaignid', cmpaignId)).toParams(), callback) },
    // function (callback) { redshift.parameterizedQuery('SELECT mastercampaignid,mastercampaignname,campaignmanager,campaigndescription,startdate,enddate FROM apps."mastercampaigns" WHERE "mastercampaignid" = $1', [cmpaignId],{ raw: true }, callback  )},
  ], function (err, results) {
    //console.log(results[0].rows);
    //console.log(results[1].rows);
    //console.log(results[2].rows);
    console.log(results[0].rows);
    console.log(results[1].rows);
    console.log(results[2].rows);
    console.log(results[3].rows);
    console.log(results[4].rows[0].startdate);
    var star = results[4].rows[0].startdate;
    var fordate = date.format(star, 'YYYY-MM-DD');
    console.log('formatted date ', fordate);
    var end = results[4].rows[0].enddate;
    var enddate = date.format(end, 'YYYY-MM-DD');
    console.log('formatted date ', enddate);
    /*  console.log('second row');
     console.log(results[1].rows); */
    res.render('../views/CST/saveDrafrhandler', { businessgroups: results[0].rows, mcasegment: results[1].rows, businessType: results[2].rows, programFamilies: results[3].rows, mastercampaign: results[4].rows, startDate: fordate, endDate: enddate });
  });


}


exports.getProgramelist = function (req, res, id) {

  var programId = id;
  console.log("campaign ID is " + programId);
  //var sta = mcasegments.select('apps.programs.programid,apps.programs.mcasegmentid ,apps.mcasegments.mcasegmentname').from('apps.programs').where($in('apps.programs.programid', programId)).innerJoin('apps.mcasegments').on('apps.programs.mcasegmentid', 'apps.mcasegments.mcasegmentid').toParams();
  //console.log(sta);
  async.parallel([
    function (callback) { redshift.query(programtabdata.select('apps.programs.programid,apps.programs.programname,apps.programs.programdescription,apps.programs.campaignmanager,apps.programs.budget,apps.programs.spend,apps.programs.startdate,apps.programs.enddate,apps.programs.mqlgoal,apps.programs.mqllow,apps.programs.mqlhigh,apps.programs.mqlsource,apps.programs.salgoal,apps.programs.sallow,apps.programs.salhigh,apps.programs.salsource,apps.programs.pipelinegoal,apps.programs.pipelinehigh,apps.programs.pipelinelow,apps.programs.pipelinesource').from('apps.programs').where($in('apps.programs.programid', programId)).toParams(), callback) },
    function (callback) { redshift.query(mcasegments.select('apps.programs.programid,apps.programs.mcasegmentid ,apps.mcasegments.mcasegmentname').from('apps.programs').where($in('apps.programs.programid', programId)).innerJoin('apps.mcasegments').on('apps.programs.mcasegmentid', 'apps.mcasegments.mcasegmentid').toParams(), callback) },
    function (callback) { redshift.query(leadbusinessgroups.select('apps.programs.programid, apps.programs.businessgroupid, apps.businessgroups.businessgroupname').from('apps.programs').where($in('apps.programs.programid', programId)).innerJoin('apps.businessgroups').on('apps.programs.businessgroupid', 'apps.businessgroups.businessgroupid').toParams(), callback) },
    function (callback) { redshift.query(leadbusinessline.select('apps.programs.programid, apps.programs.businesslineid, apps.businesslines.businesslinename').from('apps.programs').where($in('apps.programs.programid', programId)).innerJoin('apps.businesslines').on('apps.programs.businesslineid', 'apps.businesslines.businesslineid').toParams(), callback) },
    function (callback) { redshift.query(leadbusinesstype.select('apps.programs.programid, apps.programs.businesstypeid, apps.businesstype.businesstypename').from('apps.programs').where($in('apps.programs.programid', programId)).innerJoin('apps.businesstype').on('apps.programs.businesstypeid', 'apps.businesstype.businesstypeid').toParams(), callback) },
    function (callback) { redshift.query(leadindustry.select('apps.programs.programid, apps.programs.industryid, apps.industry.industryname').from('apps.programs').where($in('apps.programs.programid', programId)).innerJoin('apps.industry').on('apps.programs.industryid', 'apps.industry.industryid').toParams(), callback) },
    function (callback) { redshift.query(markets.distinct('apps.market.marketid, apps.market.marketname').from('apps.market').where($in('apps.programsmarket.programid', programId)).innerJoin('apps.programsmarket').on('apps.programsmarket.marketid', 'apps.market.marketid').toParams(), callback) },
    function (callback) { redshift.query(secbusinessgroups.distinct('apps.businessgroups.businessgroupid, apps.businessgroups.businessgroupname').from('apps.businessgroups').where($in('apps.programssecbusinessgroups.programid', programId)).innerJoin('apps.programssecbusinessgroups').on('apps.programssecbusinessgroups.businessgroupid', 'apps.businessgroups.businessgroupid').toParams(), callback) },
    function (callback) { redshift.query(secbusinesslines.distinct('apps.businesslines.businesslineid, apps.businesslines.businesslinename').from('apps.businesslines').where($in('apps.programssecbusinesslines.programid', programId)).innerJoin('apps.programssecbusinesslines').on('apps.programssecbusinesslines.businesslineid', 'apps.businesslines.businesslineid').toParams(), callback) },
    function (callback) { redshift.query(secbusinesstype.distinct('apps.businesstype.businesstypeid, apps.businesstype.businesstypename').from('apps.businesstype').where($in('apps.programssecbusinesstype.programid', programId)).innerJoin('apps.programssecbusinesstype').on('apps.programssecbusinesstype.businesstypeid', 'apps.businesstype.businesstypeid').toParams(), callback) },
    function (callback) { redshift.query(programfamily.select('apps.programs.programid,apps.programs.programfamilyid ,apps.programfamilies.programfamiliyname').from('apps.programs').where($in('apps.programs.programid', programId)).innerJoin('apps.programfamilies').on('apps.programs.programfamilyid', 'apps.programfamilies.programfamiliyid').toParams(), callback) },
  ], function (err, results) {
    console.log(results[0].rows);
    var startdate = results[0].rows[0].startdate;
    var formatStartDate = date.format(startdate, 'YYYY-MM-DD');
    console.log('formatted date ', formatStartDate);
    var endDate = results[0].rows[0].enddate;
    var Formattedenddate = date.format(endDate, 'YYYY-MM-DD');
    console.log('formatted date ', Formattedenddate);
    console.log('mcasegments  result is' +results[1].rows);
    console.log('Business groups  result is' +results[2].rows);
    console.log('Business lines are' + JSON.stringify(results[3].rows));
    console.log('Business types are' + JSON.stringify(results[4].rows));
    console.log('lead industries are' + JSON.stringify(results[5].rows));
    console.log('marketnames are' + JSON.stringify(results[6].rows));
    console.log('sec business groups are' + JSON.stringify(results[7].rows));
    console.log('sec business lines are' + JSON.stringify(results[8].rows));
    console.log('sec business types are' + JSON.stringify(results[9].rows));
    console.log('program families are ' + JSON.stringify(results[10].rows));
    res.render('../views/CST/editProgram', { programTab: results[0].rows ,startDate:formatStartDate, endDate:Formattedenddate, mcaseg:results[1].rows,leadbusiness: results[2].rows,leadbusinesslin:results[3].rows,leadbusinessty:results[4].rows,industryLead:results[5].rows ,
                                             markettab: results[6].rows,secbusinessgro: results[7].rows,secbusinessLin:results[8].rows,secbusinesstyp:results[9].rows,pfamily:results[10].rows  });
    
  });
}
var redshift = require('../redshift.js');
var async = require("async");
var moment = require('moment');
var sql = require('sql-bricks-sqlite');
var sql1 = require('sql-bricks-postgres');
var select = sql.select(), $in = sql.in;
var mcaselect = sql.select(), $in = sql.in;
var businesstypeselect = sql.select(), $in = sql.in;
var programFamilySelect = sql.select(), $in = sql.in;
var mastercampaign = sql.select(), $in = sql.in;
var programtabdata = sql.select(), $in = sql.in;
var programfamily = sql.select(), $in = sql.in;
var mcasegments = sql.select(), $in = sql.in;
var leadbusinessgroups = sql.select(), $in = sql.in;
var leadbusinessline = sql.select(), $in = sql.in;
var leadbusinesstype = sql.select(), $in = sql.in;
var leadindustry = sql.select(), $in = sql.in;
var markets = sql.select(), $in = sql.in;
var secbusinessgroups = sql.select(), $in = sql.in;
var secbusinesslines = sql.select(), $in = sql.in;
var secbusinesstype = sql.select(), $in = sql.in;

var date = require('date-and-time');

//var sss = select.distinct();
//module.exports.list = function(req, res){
//  redshift.query('SELECT mcasegmentid, mcasegmentname FROM apps."mcasegments"', {raw: true}, function(err, datamcaSegment){
//    if(err) throw err;
//    console.log(datamcaSegment[0].mcasegmentname);
//     res.render('../views/CST/mastercampaign', {page_title:"Master Campaign", data:datamcaSegment});
//  });
//}


module.exports.list = function (req, res) {
  async.parallel([
    function (callback) { redshift.query('SELECT mcasegmentid,    mcasegmentname FROM apps."mcasegments"', callback) },
    function (callback) { redshift.query('SELECT businessgroupid, businessgroupname  FROM apps."businessgroups"', callback) },
    function (callback) { redshift.query('SELECT businesstypeid,businesstypename  FROM apps."businesstype"', callback) },
    function (callback) { redshift.query('SELECT programfamiliyid,programfamiliyname  FROM apps."programfamilies"', callback) }

  ], function (err, results) {
    console.log(results[0].rows);
    console.log('second row');
    console.log(results[1].rows);
    res.render('../views/CST/mastercampaign', { mcasegment: results[0].rows, businessgroups: results[1].rows, businesstype: results[2].rows, programfamilies: results[3].rows });
  });
}

module.exports.subcampaign = function (req, res) {
  async.parallel([
    function (callback) {
      redshift.query('SELECT mcasegmentid,    mcasegmentname FROM apps."mcasegments"', callback)
      console.log("callback result is" + callback);
    },
    function (callback) { redshift.query('SELECT businessgroupid, businessgroupname  FROM apps."businessgroups"', callback) },
    function (callback) { redshift.query('SELECT businesstypeid,businesstypename  FROM apps."businesstype"', callback) },
    function (callback) { redshift.query('SELECT programfamiliyid,programfamiliyname  FROM apps."programfamilies"', callback) },
    function (callback) { redshift.query('SELECT marketid,marketname  FROM apps."market"', callback) }
  ], function (err, results) {
    console.log(results[0].rows);
    console.log('second row');
    console.log(results[1].rows);
    console.log('third row');
    console.log('market' + results[4].rows);
    res.render('../views/CST/subcampaign', { mcasegment: results[0].rows, businessgroups: results[1].rows, businesstype: results[2].rows, programfamilies: results[3].rows, market: results[4].rows });
  });
}
module.exports.subcampaign1 = function (req, res) {
  async.parallel([
    function (callback) {
      redshift.query('SELECT mcasegmentid,    mcasegmentname FROM apps."mcasegments"', callback)
      console.log("callback result is" + callback);
    },
    function (callback) { redshift.query('SELECT businessgroupid, businessgroupname  FROM apps."businessgroups"', callback) },
    function (callback) { redshift.query('SELECT businesstypeid,businesstypename  FROM apps."businesstype"', callback) },
    function (callback) { redshift.query('SELECT programfamiliyid,programfamiliyname  FROM apps."programfamilies"', callback) },
    function (callback) { redshift.query('SELECT marketid,marketname  FROM apps."market"', callback) },
    function (callback) { redshift.query('select mastercampaignid,mastercampaignname from apps."mastercampaigns"', callback) },
    function (callback) { redshift.query('select businesslineid,businesslinename from apps."businesslines"', callback) },
    function (callback) { redshift.query('select industryid,industryname from apps."industry"', callback) }
  ], function (err, results) {
    console.log(results[0].rows);
    console.log('second row');
    console.log(results[1].rows);
    console.log('third row');
    console.log('market' + results[4].rows);
    console.log('campaign' + results[5].rows);
    res.render('../views/CST/subcampaign', { mcasegment: results[0].rows, businessgroups: results[1].rows, businesstype: results[2].rows, programfamilies: results[3].rows, market: results[4].rows, campaign: results[5].rows, businessline: results[6].rows, industry: results[7].rows });
  });
}
/* 
module.exports.mca = function(mcasegmentname,req,res){

  redshift.parameterizedQuery('SELECT mcasegmentid FROM apps."mcasegments" WHERE "mcasegmentname" = $1', [mcasegmentname], { raw: true } , function(err,res){
    if(err){

    }else{
      console.log("mcaid is "+ JSON.stringify(res));
      return (JSON.stringify(res))
    }
  });
sqlbri
}
 */
module.exports.saveDraft = function (req, res) {
  async.parallel([
    function (callback) {
      redshift.query('SELECT a.mastercampaignid,a.mastercampaignname,a.campaignmanager,a.campaigndescription,a.startdate,a.enddate FROM apps."mastercampaigns" a', callback)
      //console.log("callback result is" + callback);
    }
  ], function (err, results) {
    console.log(JSON.stringify(results[0].rows));

    res.render('../views/CST/savedraft', { mastercampaign: results[0].rows });
  });
}

module.exports.getPrograme = function (req, res) {
  async.parallel([
    function (callback) {
      redshift.query('SELECT a.programid,a.programname,a.campaignmanager,a.programdescription FROM apps."programs" a', callback)
      //console.log("callback result is" + callback);
    }
  ], function (err, results) {
    console.log(JSON.stringify(results[0].rows));

    res.render('../views/CST/programsavedraft', { program: results[0].rows });
  });
}


module.exports.list11 = function (req, res) {
  async.parallel([
    function (callback) { redshift.query('SELECT mcasegmentid,    mcasegmentname FROM apps."mcasegments"', callback) },
  ], function (err, results) {
    console.log(results[0].rows);
    console.log('second row');
    console.log(results[1].rows);
    res.render('../views/CST/saveDrafrhandler', { mcasegment: results[0].rows, businessgroups: results[1].rows, businesstype: results[2].rows, programfamilies: results[3].rows });
  });
}


exports.bhbhbnames1 = function (req, res, id) {
  //var startdate = {"startdate":startdate}
  // var startdate = startdate;
  // var endDate = enddate;
  // console.log('inside start date' + startdate);
  // console.log('inside start date' + endDate);
  var cmpaignId = id;
  console.log("campaign ID is " + cmpaignId);
  /* var statement1 = select.distinct('apps.businessgroups.businessgroupname', 'apps.businessgroups.businessgroupid').from('apps.businessgroups').where($in('apps.mastercampaignsbusinessgroups.mastercampaignid', cmpaignId)).innerJoin('apps.mastercampaignsbusinessgroups').on('apps.mastercampaignsbusinessgroups.businessgroupid', 'apps.businessgroups.businessgroupid').toParams();
  var statement2 = select.distinct('apps.businessgroups.businessgroupname', 'apps.businessgroups.businessgroupid').from('apps.businessgroups').where($in('apps.mastercampaignsbusinessgroups.mastercampaignid', cmpaignId)).innerJoin('apps.mastercampaignsbusinessgroups').on('apps.mastercampaignsbusinessgroups.businessgroupid', 'apps.businessgroups.businessgroupid').toParams();

  var statement3 = select.distinct('apps.mcasegments.mcasegmentname', 'apps.mcasegments.mcasegmentid').from('apps.mcasegments').where($in('apps.mastercampaignsmcasegments.mastercampaignid', cmpaignId)).innerJoin('apps.mastercampaignsmcasegments').on('apps.mastercampaignsmcasegments.mcasegmentid', 'apps.mcasegments.mcasegmentid').toParams();
  console.log('statement1 is' + JSON.stringify(statement1))
  console.log('statement3 is' + JSON.stringify(statement3)) */
  //console.log(programFamilySelect.distinct('apps.programfamilies.programfamiliyname', 'apps.programfamilies.programfamiliyid').from('apps.programfamilies').where($in('apps.mastercampaignsprogramfamilies.mastercampaignid', cmpaignId)).innerJoin('apps.mastercampaignsprogramfamilies').on('apps.mastercampaignsprogramfamilies.programfamiliyid', 'apps.programfamilies.programfamiliyid').toParams());//


  async.parallel([
    function (callback) { redshift.query(select.distinct('apps.businessgroups.businessgroupname', 'apps.businessgroups.businessgroupid').from('apps.businessgroups').where($in('apps.mastercampaignsbusinessgroups.mastercampaignid', cmpaignId)).innerJoin('apps.mastercampaignsbusinessgroups').on('apps.mastercampaignsbusinessgroups.businessgroupid', 'apps.businessgroups.businessgroupid').toParams(), callback) },
    function (callback) { redshift.query(mcaselect.distinct('apps.mcasegments.mcasegmentname', 'apps.mcasegments.mcasegmentid').from('apps.mcasegments').where($in('apps.mastercampaignsmcasegments.mastercampaignid', cmpaignId)).innerJoin('apps.mastercampaignsmcasegments').on('apps.mastercampaignsmcasegments.mcasegmentid', 'apps.mcasegments.mcasegmentid').toParams(), callback) },
    function (callback) { redshift.query(businesstypeselect.distinct('apps.businesstype.businesstypename', 'apps.businesstype.businesstypeid').from('apps.businesstype').where($in('apps.mastercampaignsbusinesstype.mastercampaignid', cmpaignId)).innerJoin('apps.mastercampaignsbusinesstype').on('apps.mastercampaignsbusinesstype.businesstypeid', 'apps.businesstype.businesstypeid').toParams(), callback) },
    function (callback) { redshift.query(programFamilySelect.distinct('apps.programfamilies.programfamiliyname', 'apps.programfamilies.programfamiliyid').from('apps.programfamilies').where($in('apps.mastercampaignsprogramfamilies.mastercampaignid', cmpaignId)).innerJoin('apps.mastercampaignsprogramfamilies').on('apps.mastercampaignsprogramfamilies.programfamilyid', 'apps.programfamilies.programfamiliyid').toParams(), callback) },
    function (callback) { redshift.query(mastercampaign.select('apps.mastercampaigns.mastercampaignid', 'apps.mastercampaigns.campaignmanager', 'apps.mastercampaigns.campaigndescription', 'apps.mastercampaigns.mastercampaignname', 'apps.mastercampaigns.startdate', 'apps.mastercampaigns.enddate').from('apps.mastercampaigns').where($in('apps.mastercampaigns.mastercampaignid', cmpaignId)).toParams(), callback) },
    // function (callback) { redshift.parameterizedQuery('SELECT mastercampaignid,mastercampaignname,campaignmanager,campaigndescription,startdate,enddate FROM apps."mastercampaigns" WHERE "mastercampaignid" = $1', [cmpaignId],{ raw: true }, callback  )},
  ], function (err, results) {
    //console.log(results[0].rows);
    //console.log(results[1].rows);
    //console.log(results[2].rows);
    console.log(results[0].rows);
    console.log(results[1].rows);
    console.log(results[2].rows);
    console.log(results[3].rows);
    console.log(results[4].rows[0].startdate);
    var star = results[4].rows[0].startdate;
    var fordate = date.format(star, 'YYYY-MM-DD');
    console.log('formatted date ', fordate);
    var end = results[4].rows[0].enddate;
    var enddate = date.format(end, 'YYYY-MM-DD');
    console.log('formatted date ', enddate);
    /*  console.log('second row');
     console.log(results[1].rows); */
    res.render('../views/CST/saveDrafrhandler', { businessgroups: results[0].rows, mcasegment: results[1].rows, businessType: results[2].rows, programFamilies: results[3].rows, mastercampaign: results[4].rows, startDate: fordate, endDate: enddate });
  });


}


exports.getProgramelist = function (req, res, id) {

  var programId = id;
  console.log("campaign ID is " + programId);
  //var sta = mcasegments.select('apps.programs.programid,apps.programs.mcasegmentid ,apps.mcasegments.mcasegmentname').from('apps.programs').where($in('apps.programs.programid', programId)).innerJoin('apps.mcasegments').on('apps.programs.mcasegmentid', 'apps.mcasegments.mcasegmentid').toParams();
  //console.log(sta);
  async.parallel([
    function (callback) { redshift.query(programtabdata.select('apps.programs.programid,apps.programs.programname,apps.programs.programdescription,apps.programs.campaignmanager,apps.programs.budget,apps.programs.spend,apps.programs.startdate,apps.programs.enddate,apps.programs.mqlgoal,apps.programs.mqllow,apps.programs.mqlhigh,apps.programs.mqlsource,apps.programs.salgoal,apps.programs.sallow,apps.programs.salhigh,apps.programs.salsource,apps.programs.pipelinegoal,apps.programs.pipelinehigh,apps.programs.pipelinelow,apps.programs.pipelinesource').from('apps.programs').where($in('apps.programs.programid', programId)).toParams(), callback) },
    function (callback) { redshift.query(mcasegments.select('apps.programs.programid,apps.programs.mcasegmentid ,apps.mcasegments.mcasegmentname').from('apps.programs').where($in('apps.programs.programid', programId)).innerJoin('apps.mcasegments').on('apps.programs.mcasegmentid', 'apps.mcasegments.mcasegmentid').toParams(), callback) },
    function (callback) { redshift.query(leadbusinessgroups.select('apps.programs.programid, apps.programs.businessgroupid, apps.businessgroups.businessgroupname').from('apps.programs').where($in('apps.programs.programid', programId)).innerJoin('apps.businessgroups').on('apps.programs.businessgroupid', 'apps.businessgroups.businessgroupid').toParams(), callback) },
    function (callback) { redshift.query(leadbusinessline.select('apps.programs.programid, apps.programs.businesslineid, apps.businesslines.businesslinename').from('apps.programs').where($in('apps.programs.programid', programId)).innerJoin('apps.businesslines').on('apps.programs.businesslineid', 'apps.businesslines.businesslineid').toParams(), callback) },
    function (callback) { redshift.query(leadbusinesstype.select('apps.programs.programid, apps.programs.businesstypeid, apps.businesstype.businesstypename').from('apps.programs').where($in('apps.programs.programid', programId)).innerJoin('apps.businesstype').on('apps.programs.businesstypeid', 'apps.businesstype.businesstypeid').toParams(), callback) },
    function (callback) { redshift.query(leadindustry.select('apps.programs.programid, apps.programs.industryid, apps.industry.industryname').from('apps.programs').where($in('apps.programs.programid', programId)).innerJoin('apps.industry').on('apps.programs.industryid', 'apps.industry.industryid').toParams(), callback) },
    function (callback) { redshift.query(markets.distinct('apps.market.marketid, apps.market.marketname').from('apps.market').where($in('apps.programsmarket.programid', programId)).innerJoin('apps.programsmarket').on('apps.programsmarket.marketid', 'apps.market.marketid').toParams(), callback) },
    function (callback) { redshift.query(secbusinessgroups.distinct('apps.businessgroups.businessgroupid, apps.businessgroups.businessgroupname').from('apps.businessgroups').where($in('apps.programssecbusinessgroups.programid', programId)).innerJoin('apps.programssecbusinessgroups').on('apps.programssecbusinessgroups.businessgroupid', 'apps.businessgroups.businessgroupid').toParams(), callback) },
    function (callback) { redshift.query(secbusinesslines.distinct('apps.businesslines.businesslineid, apps.businesslines.businesslinename').from('apps.businesslines').where($in('apps.programssecbusinesslines.programid', programId)).innerJoin('apps.programssecbusinesslines').on('apps.programssecbusinesslines.businesslineid', 'apps.businesslines.businesslineid').toParams(), callback) },
    function (callback) { redshift.query(secbusinesstype.distinct('apps.businesstype.businesstypeid, apps.businesstype.businesstypename').from('apps.businesstype').where($in('apps.programssecbusinesstype.programid', programId)).innerJoin('apps.programssecbusinesstype').on('apps.programssecbusinesstype.businesstypeid', 'apps.businesstype.businesstypeid').toParams(), callback) },
    function (callback) { redshift.query(programfamily.select('apps.programs.programid,apps.programs.programfamilyid ,apps.programfamilies.programfamiliyname').from('apps.programs').where($in('apps.programs.programid', programId)).innerJoin('apps.programfamilies').on('apps.programs.programfamilyid', 'apps.programfamilies.programfamiliyid').toParams(), callback) },
  ], function (err, results) {
    console.log(results[0].rows);
    var startdate = results[0].rows[0].startdate;
    var formatStartDate = date.format(startdate, 'YYYY-MM-DD');
    console.log('formatted date ', formatStartDate);
    var endDate = results[0].rows[0].enddate;
    var Formattedenddate = date.format(endDate, 'YYYY-MM-DD');
    console.log('formatted date ', Formattedenddate);
    console.log('mcasegments  result is' +results[1].rows);
    console.log('Business groups  result is' +results[2].rows);
    console.log('Business lines are' + JSON.stringify(results[3].rows));
    console.log('Business types are' + JSON.stringify(results[4].rows));
    console.log('lead industries are' + JSON.stringify(results[5].rows));
    console.log('marketnames are' + JSON.stringify(results[6].rows));
    console.log('sec business groups are' + JSON.stringify(results[7].rows));
    console.log('sec business lines are' + JSON.stringify(results[8].rows));
    console.log('sec business types are' + JSON.stringify(results[9].rows));
    console.log('program families are ' + JSON.stringify(results[10].rows));
    res.render('../views/CST/editProgram', { programTab: results[0].rows ,startDate:formatStartDate, endDate:Formattedenddate, mcaseg:results[1].rows,leadbusiness: results[2].rows,leadbusinesslin:results[3].rows,leadbusinessty:results[4].rows,industryLead:results[5].rows ,
                                             markettab: results[6].rows,secbusinessgro: results[7].rows,secbusinessLin:results[8].rows,secbusinesstyp:results[9].rows,pfamily:results[10].rows  });
    
  });
}
